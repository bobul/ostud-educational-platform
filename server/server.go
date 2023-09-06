package main

import (
	"github.com/bobul/ostud-educational-platform/middlewares"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/bobul/ostud-educational-platform/graph"
	"github.com/gorilla/handlers"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))
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
