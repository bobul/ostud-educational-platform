package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"

	"github.com/bobul/ostud-educational-platform/database"
	"github.com/bobul/ostud-educational-platform/graph/model"
)

// UserLogin is the resolver for the userLogin field.
func (r *mutationResolver) UserLogin(ctx context.Context, email string, password string) (*model.Token, error) {
	return db.UserLogin(email, password)
}

// UserRegister is the resolver for the userRegister field.
func (r *mutationResolver) UserRegister(ctx context.Context, input model.CreateUserInput) (*model.Token, error) {
	return db.UserRegister(input)
}

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.CreateUserInput) (*model.User, error) {
	return db.CreateUser(input)
}

// CreateCourse is the resolver for the createCourse field.
func (r *mutationResolver) CreateCourse(ctx context.Context, input model.CreateCourseInput) (*model.Course, error) {
	return db.CreateCourse(input)
}

// CreateTask is the resolver for the createTask field.
func (r *mutationResolver) CreateTask(ctx context.Context, input model.CreateTaskInput) (*model.Task, error) {
	return db.CreateTask(input)
}

// CreateClass is the resolver for the createClass field.
func (r *mutationResolver) CreateClass(ctx context.Context, input model.CreateClassInput) (*model.Class, error) {
	return db.CreateClass(input)
}

// UpdateCourse is the resolver for the updateCourse field.
func (r *mutationResolver) UpdateCourse(ctx context.Context, input model.UpdateCourseInput) (*model.Course, error) {
	return db.UpdateCourse(input)
}

// UpdateTask is the resolver for the updateTask field.
func (r *mutationResolver) UpdateTask(ctx context.Context, input model.UpdateTaskInput) (*model.Task, error) {
	return db.UpdateTask(input)
}

// UpdateClass is the resolver for the updateClass field.
func (r *mutationResolver) UpdateClass(ctx context.Context, input model.UpdateClassInput) (*model.Class, error) {
	return db.UpdateClass(input)
}

// DeleteCourse is the resolver for the deleteCourse field.
func (r *mutationResolver) DeleteCourse(ctx context.Context, id string) (*model.Course, error) {
	return db.DeleteCourse(id)
}

// DeleteTask is the resolver for the deleteTask field.
func (r *mutationResolver) DeleteTask(ctx context.Context, id string) (*model.Task, error) {
	return db.DeleteTask(id)
}

// DeleteClass is the resolver for the deleteClass field.
func (r *mutationResolver) DeleteClass(ctx context.Context, id string) (*model.Class, error) {
	return db.DeleteClass(id)
}

// GetUserByEmail is the resolver for the getUserByEmail field.
func (r *queryResolver) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	return db.GetUserByEmail(email)
}

// GetCourse is the resolver for the getCourse field.
func (r *queryResolver) GetCourse(ctx context.Context, id string) (*model.Course, error) {
	return db.GetCourse(id)
}

// GetCourses is the resolver for the getCourses field.
func (r *queryResolver) GetCourses(ctx context.Context) ([]*model.Course, error) {
	return db.GetCourses()
}

// GetTask is the resolver for the getTask field.
func (r *queryResolver) GetTask(ctx context.Context, id string) (*model.Task, error) {
	return db.GetTask(id)
}

// GetTasks is the resolver for the getTasks field.
func (r *queryResolver) GetTasks(ctx context.Context) ([]*model.Task, error) {
	return db.GetTasks()
}

// GetClass is the resolver for the getClass field.
func (r *queryResolver) GetClass(ctx context.Context, id string) (*model.Class, error) {
	return db.GetClass(id)
}

// GetClasses is the resolver for the getClasses field.
func (r *queryResolver) GetClasses(ctx context.Context) ([]*model.Class, error) {
	return db.GetClasses()
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//   - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//     it when you're done.
//   - You have helper methods in this file. Move them out to keep these resolver files clean.
var db, err = database.Connect()
