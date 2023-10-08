package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type PieceOfNews struct {
	ID          string `bson:"_id,omitempty" json:"-"`
	Title       string `json:"title"`
	Description string `json:"description"`
	TeacherID   string `json:"teacher_id"`
}

type CreatePieceOfNewsInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	TeacherID   string `json:"teacher_id"`
}

type PieceOfNewsObjectId struct {
	ID          string             `bson:"_id,omitempty" json:"-"`
	Title       string             `json:"title"`
	Description string             `json:"description"`
	TeacherID   primitive.ObjectID `bson:"teacher_id" json:"-"`
}
