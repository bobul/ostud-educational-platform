package middlewares

import (
	"context"
	"net/http"
)

func CookieMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := context.WithValue(r.Context(), "httpWriter", w)
		r = r.WithContext(ctx)
		next.ServeHTTP(w, r)
	})
}
