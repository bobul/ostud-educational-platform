package main

import (
	"github.com/bobul/ostud-educational-platform/database"
	"github.com/bobul/ostud-educational-platform/middlewares"
	"github.com/bobul/ostud-educational-platform/service"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/cors"
	"github.com/joho/godotenv"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/bobul/ostud-educational-platform/graph"
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
	var mailService = service.NewMailService()

	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{DB: db, Mail: mailService}})).ServeHTTP

	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"http://localhost:5173"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"X-Requested-With", "Content-Type", "Authorization"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Use(middlewares.CookieMiddleware)
	r.Use(middlewares.AuthMiddleware)

	r.Post("/", srv)

	r.Route("/api", func(r chi.Router) {
		r.Get("/activate/{activationLink}", db.UserActivate)
		r.Post("/uploadAvatar", service.UploadAvatar)
	})

	fs := http.FileServer(http.Dir("./static"))
	r.Handle("/static/*", http.StripPrefix("/static/", fs))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
