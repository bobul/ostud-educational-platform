package model

type Session struct {
	UserID       string `json:"userId"`
	RefreshToken string `json:"refreshToken"`
	ExpiresIn    int    `json:"expiresIn"`
}
