package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"

	"github.com/bobul/ostud-educational-platform/graph/model"
)

// Refresh is the resolver for the refresh field.
func (r *mutationResolver) Refresh(ctx context.Context) (*model.AuthResponse, error) {
	return r.DB.Refresh(ctx)
}

// UserLogin is the resolver for the userLogin field.
func (r *mutationResolver) UserLogin(ctx context.Context, email string, password string) (*model.AuthResponse, error) {
	return r.DB.UserLogin(ctx, email, password)
}

// UserRegister is the resolver for the userRegister field.
func (r *mutationResolver) UserRegister(ctx context.Context, input model.CreateUserInput) (*model.AuthResponse, error) {
	return r.DB.UserRegister(ctx, r.Mail, input)
}

// UserLogout is the resolver for the userLogout field.
func (r *mutationResolver) UserLogout(ctx context.Context) (bool, error) {
	return r.DB.UserLogout(ctx)
}

// CreateCourse is the resolver for the createCourse field.
func (r *mutationResolver) CreateCourse(ctx context.Context, input model.CreateCourseInput) (*model.Course, error) {
	return r.DB.CreateCourse(input)
}

// CreateTask is the resolver for the createTask field.
func (r *mutationResolver) CreateTask(ctx context.Context, input model.CreateTaskInput) (*model.Task, error) {
	return r.DB.CreateTask(input)
}

// CreateClass is the resolver for the createClass field.
func (r *mutationResolver) CreateClass(ctx context.Context, input model.CreateClassInput) (*model.Class, error) {
	return r.DB.CreateClass(input)
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, input model.UpdateUserInput) (*model.User, error) {
	return r.DB.UpdateUser(r.Mail, input)
}

// UpdateCourse is the resolver for the updateCourse field.
func (r *mutationResolver) UpdateCourse(ctx context.Context, input model.UpdateCourseInput) (*model.Course, error) {
	return r.DB.UpdateCourse(input)
}

// UpdateTask is the resolver for the updateTask field.
func (r *mutationResolver) UpdateTask(ctx context.Context, input model.UpdateTaskInput) (*model.Task, error) {
	return r.DB.UpdateTask(input)
}

// UpdateClass is the resolver for the updateClass field.
func (r *mutationResolver) UpdateClass(ctx context.Context, input model.UpdateClassInput) (*model.Class, error) {
	return r.DB.UpdateClass(input)
}

// DeleteCourse is the resolver for the deleteCourse field.
func (r *mutationResolver) DeleteCourse(ctx context.Context, id string) (*model.Course, error) {
	return r.DB.DeleteCourse(id)
}

// DeleteTask is the resolver for the deleteTask field.
func (r *mutationResolver) DeleteTask(ctx context.Context, id string) (*model.Task, error) {
	return r.DB.DeleteTask(id)
}

// DeleteClass is the resolver for the deleteClass field.
func (r *mutationResolver) DeleteClass(ctx context.Context, id string) (*model.Class, error) {
	return r.DB.DeleteClass(id)
}

// GetUserByEmail is the resolver for the getUserByEmail field.
func (r *queryResolver) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	return r.DB.GetUserByEmail(email)
}

// GetUserByID is the resolver for the getUserById field.
func (r *queryResolver) GetUserByID(ctx context.Context, id string) (*model.User, error) {
	return r.DB.GetUserById(ctx, id)
}

// GetCourse is the resolver for the getCourse field.
func (r *queryResolver) GetCourse(ctx context.Context, id string) (*model.Course, error) {
	return r.DB.GetCourse(id)
}

// GetCourses is the resolver for the getCourses field.
func (r *queryResolver) GetCourses(ctx context.Context) ([]*model.Course, error) {
	return r.DB.GetCourses()
}

// GetTask is the resolver for the getTask field.
func (r *queryResolver) GetTask(ctx context.Context, id string) (*model.Task, error) {
	return r.DB.GetTask(id)
}

// GetTasks is the resolver for the getTasks field.
func (r *queryResolver) GetTasks(ctx context.Context) ([]*model.Task, error) {
	return r.DB.GetTasks()
}

// GetClass is the resolver for the getClass field.
func (r *queryResolver) GetClass(ctx context.Context, id string) (*model.Class, error) {
	return r.DB.GetClass(id)
}

// GetClasses is the resolver for the getClasses field.
func (r *queryResolver) GetClasses(ctx context.Context) ([]*model.Class, error) {
	return r.DB.GetClasses()
}

// GetClassesByTeacherID is the resolver for the getClassesByTeacherId field.
func (r *queryResolver) GetClassesByTeacherID(ctx context.Context, id string) ([]*model.Class, error) {
	return r.DB.GetClassesByTeacherId(ctx, id)
}

// GetClassByID is the resolver for the getClassById field.
func (r *queryResolver) GetClassByID(ctx context.Context, id string) (*model.Class, error) {
	return r.DB.GetClassById(ctx, id)
}

// GetCoursesByClassID is the resolver for the getCoursesByClassId field.
func (r *queryResolver) GetCoursesByClassID(ctx context.Context, id string) ([]*model.Course, error) {
	return r.DB.GetCoursesByClassId(ctx, id)
}

// GetCourseByID is the resolver for the getCourseById field.
func (r *queryResolver) GetCourseByID(ctx context.Context, id string) (*model.Course, error) {
	return r.DB.GetCourseById(ctx, id)
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
