// Code generated by github.com/99designs/gqlgen, DO NOT EDIT.

package model
//
//type AuthResponse struct {
//	Tokens *Token `json:"tokens"`
//	User   *User  `json:"user"`
//}
//
//type Class struct {
//	ID       string   `json:"_id"`
//	Number   int      `json:"number"`
//	Letter   string   `json:"letter"`
//	Students []string `json:"students"`
//	Teachers []string `json:"teachers"`
//}
//
//type Course struct {
//	ID          string  `json:"_id"`
//	Title       string  `json:"title"`
//	Description *string `json:"description,omitempty"`
//	ClassID     string  `json:"class_id"`
//}
//
//type CreateClassInput struct {
//	Number    int    `json:"number"`
//	Letter    string `json:"letter"`
//	TeacherID string `json:"teacher_id"`
//}
//
//type CreateCourseInput struct {
//	Title       string  `json:"title"`
//	Description *string `json:"description,omitempty"`
//	ClassID     string  `json:"class_id"`
//}
//
//type CreatePieceOfNewsInput struct {
//	Title          string `json:"title"`
//	Description    string `json:"description"`
//	TeacherID      string `json:"teacher_id"`
//	TeacherName    string `json:"teacher_name"`
//	TeacherSurname string `json:"teacher_surname"`
//}
//
//type CreateTaskInput struct {
//	Title       string  `json:"title"`
//	Description *string `json:"description,omitempty"`
//	Deadline    *string `json:"deadline,omitempty"`
//	CourseID    string  `json:"course_id"`
//}
//
//type CreateUserInput struct {
//	Role      string  `json:"role"`
//	Email     string  `json:"email"`
//	FirstName string  `json:"firstName"`
//	LastName  string  `json:"lastName"`
//	Password  string  `json:"password"`
//	Dob       *string `json:"dob,omitempty"`
//}
//
//type PieceOfNews struct {
//	ID             string `json:"_id"`
//	Title          string `json:"title"`
//	Description    string `json:"description"`
//	TeacherID      string `json:"teacher_id"`
//	TeacherName    string `json:"teacher_name"`
//	TeacherSurname string `json:"teacher_surname"`
//	DateOfCreation string `json:"dateOfCreation"`
//}
//
//type Session struct {
//	UserID       string `json:"userId"`
//	RefreshToken string `json:"refreshToken"`
//	ExpiresIn    int    `json:"expiresIn"`
//}
//
//type Task struct {
//	ID          string  `json:"_id"`
//	Title       string  `json:"title"`
//	Description *string `json:"description,omitempty"`
//	Deadline    *string `json:"deadline,omitempty"`
//	CourseID    string  `json:"course_id"`
//}
//
//type Token struct {
//	AccessToken  string `json:"accessToken"`
//	RefreshToken string `json:"refreshToken"`
//}
//
//type UpdateClassInput struct {
//	ID     string  `json:"_id"`
//	Number *int    `json:"number,omitempty"`
//	Letter *string `json:"letter,omitempty"`
//}
//
//type UpdateCourseInput struct {
//	ID          string  `json:"_id"`
//	Title       string  `json:"title"`
//	Description *string `json:"description,omitempty"`
//}
//
//type UpdateTaskInput struct {
//	ID          string  `json:"_id"`
//	Title       string  `json:"title"`
//	Description *string `json:"description,omitempty"`
//	Deadline    *string `json:"deadline,omitempty"`
//}
//
//type UpdateUserInput struct {
//	ID        string  `json:"_id"`
//	FirstName string  `json:"firstName"`
//	LastName  string  `json:"lastName"`
//	Email     string  `json:"email"`
//	Password  *string `json:"password,omitempty"`
//	Image     *string `json:"image,omitempty"`
//}
//
//type User struct {
//	ID             string  `json:"id"`
//	Role           string  `json:"role"`
//	Email          string  `json:"email"`
//	FirstName      string  `json:"firstName"`
//	LastName       string  `json:"lastName"`
//	Password       string  `json:"password"`
//	Image          *string `json:"image,omitempty"`
//	Rd             string  `json:"rd"`
//	Dob            *string `json:"dob,omitempty"`
//	ActivationLink string  `json:"activationLink"`
//	IsActivate     bool    `json:"isActivate"`
//}
