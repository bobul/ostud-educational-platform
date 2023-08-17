package model

type User struct {
	ID               string  `bson:"_id,omitempty" json:"-"`
	Role             string  `json:"role"`
	Email            string  `json:"email"`
	Name             string  `json:"name"`
	Surname          string  `json:"surname"`
	Password         string  `json:"password"`
	Image            *string `json:"image,omitempty"`
	RegistrationDate string  `json:"registration_date"`
	BirthdayDate     *string `json:"birthday_date,omitempty"`
}

type CreateUserInput struct {
	Role         string  `json:"role"`
	Email        string  `json:"email"`
	Name         string  `json:"name"`
	Surname      string  `json:"surname"`
	Password     string  `json:"password"`
	BirthdayDate *string `json:"birthday_date,omitempty"`
}
