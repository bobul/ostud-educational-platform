package main

import (
	"github.com/bobul/ostud-educational-platform/database"
	"github.com/bobul/ostud-educational-platform/middlewares"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/bobul/ostud-educational-platform/graph"
	"github.com/gorilla/handlers"
)

func envLoad() {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading env target")
	}
}

const defaultPort = "8080"

func main() {
	envLoad()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	var db, err = database.Connect()
	if err != nil {
		panic("Database connection error")
	}
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{DB: db}}))
	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)
	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)

	log.Fatal(http.ListenAndServe(":"+port,
		handlers.CORS(
			handlers.AllowedOrigins([]string{"http://localhost:5173"}),
			handlers.AllowCredentials(),
			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
			handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		)(middlewares.CookieMiddleware(middlewares.AuthMiddleware(srv)))))

}
