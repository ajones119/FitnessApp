package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/go-resty/resty/v2"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/rs/cors"
	"github.com/supabase-community/gotrue-go/types"
	"github.com/supabase-community/supabase-go"
)

func validateSession(accessToken string) (bool, error) {
	supabaseURL := os.Getenv("DATABASE_URL")
	if supabaseURL == "" {
		return false, fmt.Errorf("DATABASE_URL is not set")
	}

	client := resty.New()
	log.Println("\n\n\nValidating session with access token:", accessToken)
	log.Println("Supabase URL: ", supabaseURL)
	resp, err := client.R().
		SetHeader("Authorization", accessToken).
		SetAuthToken(accessToken).
		SetBody(map[string]string{"email": "agj1113@gmail.com", "type": "email"}).
		Post(fmt.Sprintf("%s/auth/v1/verify", supabaseURL))

	//print response
	log.Println("Response: ", resp)

	if err != nil {
		return false, err
	}

	if resp.StatusCode() == http.StatusOK {
		return true, nil
	}

	return false, fmt.Errorf("invalid session, status code: %d", resp.StatusCode())
}

func WriteJSON(w http.ResponseWriter, status int, v any) error {
	w.Header().Set("Content-Type", "application/json") // Ensure response is JSON
	w.WriteHeader(status)
	return json.NewEncoder(w).Encode(v)
}

type APIFunc func(http.ResponseWriter, *http.Request) error
type APIError struct {
	Error string
}

func makeHTTPHandleFunc(f APIFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if err := f(w, r); err != nil {
			//handle error
			WriteJSON(w, http.StatusBadRequest, APIError{Error: err.Error()})
		}
	}
}

type APIServer struct {
	listenAddr string
	dbpool *pgxpool.Pool
	supabaseClient *supabase.Client
	user  *types.UserResponse
}

func NewAPIServer(listenAddr string, dbpool *pgxpool.Pool, supabaseClient *supabase.Client) *APIServer {
	return &APIServer{
		listenAddr: listenAddr,
		dbpool: dbpool,
		supabaseClient: supabaseClient,
	}
}

func (s *APIServer) Run() {
	router := mux.NewRouter()

	router.HandleFunc("/account", makeHTTPHandleFunc(s.handleAccount))
	router.HandleFunc("/account/{id}", makeHTTPHandleFunc(s.handleGetAccount))
	router.HandleFunc("/check-login", makeHTTPHandleFunc(s.handleCheckLogin))

    // Handle preflight OPTIONS requests
    router.Methods(http.MethodOptions).HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
    })

	// Wrap the router with the CORS middleware
    c := cors.New(cors.Options{
        AllowedOrigins:   []string{"http://localhost:5173"}, // Allow only your React app
        AllowCredentials: true,
        AllowedMethods:   []string{"GET", "POST", "DELETE", "PATCH", "OPTIONS"}, // Specify allowed methods
        AllowedHeaders:   []string{"Authorization", "Content-Type"},          // Specify allowed headers
    })

	handler := c.Handler(router)

	log.Println("JSON API SERVER RUNNING ON port: ", s.listenAddr)
	log.Fatal(http.ListenAndServe(s.listenAddr, handler))

	http.ListenAndServe(s.listenAddr, router)
}

func (s *APIServer) handleCheckLogin(w http.ResponseWriter, r *http.Request) error {
	accessToken := r.Header.Get("Authorization")
	if accessToken == "" {
		return fmt.Errorf("missing access token")
	}
	accessToken = strings.TrimPrefix(accessToken, "Bearer ")
	log.Println("Access token: ", accessToken)
	client := s.supabaseClient.Auth.WithToken(accessToken)
	user, err := client.GetUser()

	if err != nil {
		log.Println("Error getting user: ", err)	
	}

	if (user == nil) {
		return fmt.Errorf("invalid session")
	}

	//print user
	log.Println("User: ", user.User.ID)

	if err != nil {
		return err
	}

	return nil
}


func (s *APIServer) handleAccount(w http.ResponseWriter, r *http.Request) error {
	if (r.Method == "GET") {
		return s.handleGetAccount(w, r)
	}
	if (r.Method == "POST") {
		return s.handleCreateAccount(w, r)
	}
	if (r.Method == "DELETE") {
		return s.handleDeleteAccount(w, r)
	}

	return fmt.Errorf("method not allowed %s", r.Method);
}

func (s *APIServer) handleGetAccount(w http.ResponseWriter, r *http.Request) error {	
	account := NewAccount("Anthony", "GG")

	return WriteJSON(w, http.StatusOK, account)
}

func (s *APIServer) handleCreateAccount(w http.ResponseWriter, r *http.Request) error {
	return nil;
}

func (s *APIServer) handleDeleteAccount(w http.ResponseWriter, r *http.Request) error {
	return nil;
}

func (s *APIServer) handleTransferAccount(w http.ResponseWriter, r *http.Request) error {
	return nil;
}