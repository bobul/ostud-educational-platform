package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	ID             string  `json:"id"`
	Role           string  `json:"role"`
	Email          string  `json:"email"`
	FirstName      string  `json:"firstName"`
	LastName       string  `json:"lastName"`
	Password       string  `json:"password"`
	Image          *string `json:"image,omitempty"`
	Rd             string  `json:"rd"`
	Dob            *string `json:"dob,omitempty"`
	ActivationLink string  `json:"activationLink"`
	IsActivate     bool    `json:"isActivate"`
}

type UserDateTime struct {
	ID             string              `bson:"_id,omitempty" json:"-"`
	Role           string              `json:"role"`
	Email          string              `json:"email"`
	FirstName      string              `json:"firstName"`
	LastName       string              `json:"lastName"`
	Password       string              `json:"password"`
	Image          *string             `json:"image,omitempty"`
	Rd             primitive.DateTime  `bson:"rd" json:"rd"`
	Dob            *primitive.DateTime `bson:"dob,omitempty" json:"dob,omitempty"`
	ActivationLink string              `json:"activationLink"`
	IsActivate     bool                `json:"isActivate"`
}

type CreateUserInput struct {
	Role      string  `json:"role"`
	Email     string  `json:"email"`
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Password  string  `json:"password"`
	Dob       *string `json:"dob,omitempty"`
}
