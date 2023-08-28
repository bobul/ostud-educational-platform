package model

type AuthResponse struct {
	Tokens *Token `json:"tokens"`
	User   *User  `json:"user"`
}
