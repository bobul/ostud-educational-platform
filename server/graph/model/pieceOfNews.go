package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type PieceOfNews struct {
	ID             string `bson:"_id,omitempty" json:"-"`
	Title          string `json:"title"`
	Description    string `json:"description"`
	TeacherID      string `bson:"teacher_id" json:"-"`
	TeacherName    string `json:"teacher_name"`
	TeacherSurname string `json:"teacher_surname"`
	DateOfCreation string `json:"dateOfCreation"`
}

type CreatePieceOfNewsInput struct {
	Title          string `json:"title"`
	Description    string `json:"description"`
	TeacherID      string `json:"teacher_id"`
	TeacherName    string `json:"teacher_name"`
	TeacherSurname string `json:"teacher_surname"`
}

type PieceOfNewsDateTimeAndObjectId struct {
	ID             string             `bson:"_id,omitempty" json:"-"`
	Title          string             `json:"title"`
	Description    string             `json:"description"`
	TeacherID      primitive.ObjectID `bson:"teacher_id" json:"-"`
	TeacherName    string             `json:"teacher_name"`
	TeacherSurname string             `json:"teacher_surname"`
	DateOfCreation primitive.DateTime `bson:"dateOfCreation" json:"dateOfCreation"`
}
