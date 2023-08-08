package model

type Class struct {
	ID        string `bson:"_id,omitempty" json:"-"`
	Number    int    `json:"number"`
	Letter    string `json:"letter"`
	TeacherID string `json:"teacher_id"`
}
