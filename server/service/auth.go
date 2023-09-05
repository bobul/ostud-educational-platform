package service

import (
	"encoding/json"
	"fmt"
	"github.com/graphql-go/graphql/language/ast"
	"github.com/graphql-go/graphql/language/parser"
	"golang.org/x/crypto/bcrypt"
	"io/ioutil"
	"net/http"
)

type GraphQLRequest struct {
	Query     string      `json:"query"`
	Variables interface{} `json:"variables"`
}

func HashPassword(s string) string {
	hashed, _ := bcrypt.GenerateFromPassword([]byte(s), bcrypt.DefaultCost)
	return string(hashed)
}

func ComparePassword(hashed string, normal string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashed), []byte(normal))
}

func GetOperationNameFromRequest(r *http.Request) string {
	body, err := ioutil.ReadAll(r.Body)

	if err != nil {
		return fmt.Sprint(err)
	}

	var request GraphQLRequest

	err = json.Unmarshal(body, &request)
	if err != nil {
		return fmt.Sprint(err)
	}
	r.Body.Close()
	return parseOperationName(request.Query)
}

func parseOperationName(query string) string {
	// Parse the GraphQL query
	doc, err := parser.Parse(parser.ParseParams{Source: query})
	if err != nil {
		return ""
	}

	// Iterate through the definitions to find the operation name
	for _, def := range doc.Definitions {
		operationDef := def.(*ast.OperationDefinition)
		if operationDef.Name != nil {
			return operationDef.Name.Value
		}
	}

	return ""
}
