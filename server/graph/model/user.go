package model

type User struct {
	ID        string  `bson:"_id,omitempty" json:"-"`
	Role      string  `json:"role"`
	Email     string  `json:"email"`
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Password  string  `json:"password"`
	Image     *string `json:"image,omitempty"`
	Rd        string  `json:"rd"`
	Dob       *string `json:"dob,omitempty"`
}

type CreateUserInput struct {
	Role      string  `json:"role"`
	Email     string  `json:"email"`
	FirstName string  `json:"firstName"`
	LastName  string  `json:"lastName"`
	Password  string  `json:"password"`
	Dob       *string `json:"dob,omitempty"`
}
