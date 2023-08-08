package model

type Student struct {
	ID      string `bson:"_id,omitempty" json:"-"`
	ClassID string `json:"class_id"`
}
