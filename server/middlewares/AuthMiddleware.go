package middlewares

import (
	"context"
	"github.com/bobul/ostud-educational-platform/service"
	"net/http"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		operationName := service.GetOperationNameFromRequest(r)
		if operationName == "userLogin" || operationName == "userRegister" || operationName == "getUserById" {
			next.ServeHTTP(w, r)
			return
		}

		const BearerSchema = "Bearer "
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		tokenString := authHeader[len(BearerSchema):]

		username, err := service.JwtParseToken(tokenString)
		if err != nil {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		contextWithToken := context.WithValue(r.Context(), "username", username)
		r = r.WithContext(contextWithToken)
		next.ServeHTTP(w, r)
	})
}
