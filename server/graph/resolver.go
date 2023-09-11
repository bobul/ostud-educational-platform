package graph

import (
	"github.com/bobul/ostud-educational-platform/database"
	"github.com/bobul/ostud-educational-platform/service"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	DB   *database.DB
	Mail *service.MailService
}
