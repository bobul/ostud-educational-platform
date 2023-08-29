package service

import (
	"github.com/bobul/ostud-educational-platform/graph/model"
	"github.com/dgrijalva/jwt-go"
	"log"
	"time"
)

var (
	SecretKey = []byte("secret")
)

func JwtGenerateTokens(user *model.User) (string, string, error) {
	accessToken := jwt.New(jwt.SigningMethodHS256)
	accessClaims := accessToken.Claims.(jwt.MapClaims)
	accessClaims["id"] = &user.ID
	accessClaims["email"] = &user.Email
	accessClaims["role"] = &user.Role
	accessClaims["firstName"] = &user.FirstName
	accessClaims["lastName"] = &user.LastName
	accessClaims["rd"] = &user.Rd
	accessClaims["dob"] = &user.Dob

	accessClaims["exp"] = time.Now().Add(time.Hour * 1).Unix()
	accessString, err := accessToken.SignedString(SecretKey)
	if err != nil {
		log.Fatal("Error in Generating access token")
		return "", "", err
	}

	refreshToken := jwt.New(jwt.SigningMethodHS256)
	refreshClaims := refreshToken.Claims.(jwt.MapClaims)
	refreshClaims["id"] = &user.ID
	refreshClaims["email"] = &user.Email
	refreshClaims["role"] = &user.Role
	refreshClaims["firstName"] = &user.FirstName
	refreshClaims["lastName"] = &user.LastName
	refreshClaims["rd"] = &user.Rd
	refreshClaims["dob"] = &user.Dob
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
		username := claims["email"].(string)
		return username, nil
	} else {
		return "", err
	}
}
