package model

import "go.mongodb.org/mongo-driver/bson/primitive"

type Course struct {
	ID          string  `bson:"_id,omitempty" json:"-"`
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
	ClassID     string  `json:"class_id"`
}

type CourseObjectId struct {
	ID          string             `bson:"_id,omitempty" json:"-"`
	Title       string             `json:"title"`
	Description *string            `json:"description,omitempty"`
	ClassID     primitive.ObjectID `bson:"class_id" json:"-"`
}

type CreateCourseInput struct {
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
	ClassID     string  `json:"class_id"`
}

type UpdateCourseInput struct {
	ID          string  `json:"_id"`
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
}
