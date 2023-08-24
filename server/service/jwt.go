package service

import (
	"github.com/dgrijalva/jwt-go"
	"log"
	"time"
)

var (
	SecretKey = []byte("secret")
)

func JwtGenerateTokens(username string) (string, string, error) {
	accessToken := jwt.New(jwt.SigningMethodHS256)
	accessClaims := accessToken.Claims.(jwt.MapClaims)
	accessClaims["username"] = username
	accessClaims["exp"] = time.Now().Add(time.Hour * 1).Unix()
	accessString, err := accessToken.SignedString(SecretKey)
	if err != nil {
		log.Fatal("Error in Generating access token")
		return "", "", err
	}

	refreshToken := jwt.New(jwt.SigningMethodHS256)
	refreshClaims := refreshToken.Claims.(jwt.MapClaims)
	refreshClaims["username"] = username
	refreshClaims["exp"] = time.Now().Add(time.Hour * 24 * 7).Unix()
	refreshString, err := refreshToken.SignedString(SecretKey)
	if err != nil {
		log.Fatal("Error in Generating refresh token")
		return "", "", err
	}

	return accessString, refreshString, nil
}

func JwtParseToken(tokenStr string) (string, error) {
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		return SecretKey, nil
	})
	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		username := claims["username"].(string)
		return username, nil
	} else {
		return "", err
	}
}
