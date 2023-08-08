package model

type Course struct {
	ID          string  `bson:"_id,omitempty" json:"-"`
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
	ClassID     string  `json:"classId"`
}

type CreateCourseInput struct {
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
}

type UpdateCourseInput struct {
	ID          string  `json:"_id"`
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
}
