package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	//"github.com/supabase-community/supabase-go"
)


func connectToDB() (*pgxpool.Pool, error) {
	err := godotenv.Load();
	if err != nil {
		log.Println("Error loading .env file")
	}

	dbURL := os.Getenv("DATABASE_CONNECTION")
	if dbURL == "" {
		return nil, fmt.Errorf("DATABASE_CONNECTION is not set")
	}

	dbpool, err := pgxpool.New(context.Background(), dbURL)
	if err != nil {
		return nil, fmt.Errorf("unable to connect to database: %v", err)
	}

	if err := dbpool.Ping(context.Background()); err != nil {
		return nil, fmt.Errorf("unable to ping database: %v", err)
	}
	fmt.Println("Connected to database")

	return dbpool, nil
}

func iterateResults(rows pgx.Rows) ([]map[string]interface{}, error) {

	var data []map[string]interface{}

	for rows.Next() {
		values, err := rows.Values()
		if err != nil {
			return nil, fmt.Errorf("error reading row values: %v", err)
		}

		// Get column names
		fields := rows.FieldDescriptions()
		exercise := make(map[string]interface{})

		// Map column names to values
		for i, field := range fields {
			exercise[string(field.Name)] = values[i]
		}

		data = append(data, exercise)
	}

	// Check for row iteration errors
	if rows.Err() != nil {
		return nil, fmt.Errorf("error iterating rows: %v", rows.Err())
	}

	return data, nil
}

func getWeightliftingAggregateForTheWeek(dbpool *pgxpool.Pool, userId string) ([]map[string]interface{}, error) {
	query := `SELECT 
    we.id AS "exerciseId",
    we.name AS "exerciseName",
    mg.name AS "muscleGroup",
    mg."parentGroup" AS "parentMuscleGroupId",
    we."group" AS "mgId",
    SUM(orm.reps * orm.weight + orm."leftReps" * orm."leftWeight") AS "totalVolume",
    COUNT(orm.id) AS "exerciseInstanceCount"
FROM 
    "Workout_Weightlifting_Exercises" orm
JOIN 
    "Weight_Exercises" we ON orm.exercise = we.id
JOIN 
    "Muscle_Groups" mg ON we."group" = mg.id
WHERE
    orm.user_id = $1
    AND
    orm.completed = true
    AND
    orm.created_at >= date_trunc('week', current_date) + interval '0 hours' + interval '1 minute'
GROUP BY 
    we.id, we.name, mg.name, mg."parentGroup"
ORDER BY 
    we.name;`
	
		rows, err := dbpool.Query(context.Background(), query, userId)
		if err != nil {
			return nil, fmt.Errorf("error fetching exercises: %v", err)
		}
		defer rows.Close()
	
		exercises, err := iterateResults(rows)
	
		return exercises, err
}

func getExercisesAggregateBestOneRepMaxes(dbpool *pgxpool.Pool, userId string) ([]map[string]interface{}, error) {
	// Query to fetch all rows from the "Exercise" table
	query := `WITH OneRepMax AS (
    SELECT
        *,
        (weight * (1 + reps / 30.0) + COALESCE("leftWeight" * (1 + "leftReps" / 30.0), 0)) AS one_rep_max
    FROM
        "Workout_Weightlifting_Exercises"
    WHERE
        user_id = $1
        AND
        completed = true
),
MaxOneRep AS (
    SELECT 
        orm.exercise,
        MAX(orm.one_rep_max) AS best_one_rep_max
    FROM 
        OneRepMax orm
    GROUP BY 
        orm.exercise
)
SELECT 
    we.id AS exerciseId,
    we.name AS exerciseName,
    orm.workout AS workoutId,
    orm.one_rep_max AS best_one_rep_max,
    orm.reps,
    orm.weight,
    orm.id AS exerciseInstanceId -- Assuming this is the ID of the instance from Workout_Weightlifting_Exercises
FROM 
    MaxOneRep mo
JOIN 
    OneRepMax orm ON mo.exercise = orm.exercise AND mo.best_one_rep_max = orm.one_rep_max
JOIN 
    "Weight_Exercises" we ON orm.exercise = we.id
ORDER BY 
    we.name;`

	rows, err := dbpool.Query(context.Background(), query, userId)
	if err != nil {
		return nil, fmt.Errorf("error fetching exercises: %v", err)
	}
	defer rows.Close()

	exercises, err := iterateResults(rows)

	return exercises, err
}