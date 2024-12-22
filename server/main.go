package main

import (
	"log"
	"os"
	"github.com/supabase-community/supabase-go"
)

func main() {

	dbpool, err := connectToDB()
	if err != nil {
		log.Fatalf("Error connecting to database: %v", err)
	}
	defer dbpool.Close()

	DATABASE_URL := os.Getenv("DATABASE_URL")
	DATABASE_KEY := os.Getenv("DATABASE_KEY")
	supabaseClient, err := supabase.NewClient(DATABASE_URL, DATABASE_KEY, &supabase.ClientOptions{})

	if err != nil {
		log.Fatalf("Error connecting to Supabase: %v", err)
	}


	server := NewAPIServer(":3000", dbpool, supabaseClient)
	server.Run()
}