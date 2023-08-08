package model

type User struct {
	ID               string  `json:"id"`
	Role             string  `json:"role"`
	Email            string  `json:"email"`
	Name             string  `json:"name"`
	Surname          string  `json:"surname"`
	Password         string  `json:"password"`
	Image            *string `json:"image,omitempty"`
	RegistrationDate string  `json:"registration_date"`
	BirthdayDate     *string `json:"birthday_date,omitempty"`
}
