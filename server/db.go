package main

import (
	"context"
	"fmt"
	"log"
	"os"

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