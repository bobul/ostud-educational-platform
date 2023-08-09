package model

type Task struct {
	ID          string  `bson:"_id,omitempty" json:"-"`
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
	Deadline    *string `json:"deadline,omitempty"`
	CourseID    string  `json:"course_id"`
}

type CreateTaskInput struct {
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
	Deadline    *string `json:"deadline,omitempty"`
	CourseID    string  `json:"course_id"`
}

type UpdateTaskInput struct {
	ID          string  `json:"_id"`
	Title       string  `json:"title"`
	Description *string `json:"description,omitempty"`
	Deadline    *string `json:"deadline,omitempty"`
}
