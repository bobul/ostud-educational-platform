package model

type Class struct {
	ID        string `bson:"_id,omitempty" json:"-"`
	Number    int    `json:"number"`
	Letter    string `json:"letter"`
	TeacherID string `json:"teacher_id"`
}

type CreateClassInput struct {
	Number    int    `json:"number"`
	Letter    string `json:"letter"`
	TeacherID string `json:"teacher_id"`
}

type UpdateClassInput struct {
	ID        string  `json:"_id"`
	Number    *int    `json:"number,omitempty"`
	Letter    *string `json:"letter,omitempty"`
	TeacherID string  `json:"teacher_id"`
}
