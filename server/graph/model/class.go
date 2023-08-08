package model

type Class struct {
	ID        string `json:"id"`
	Number    int    `json:"number"`
	Letter    string `json:"letter"`
	TeacherID string `json:"teacher_id"`
}
