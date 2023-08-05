package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"
	"fmt"
	"github.com/bobul/ostud-educational-platform/db"
	"github.com/bobul/ostud-educational-platform/graph/model"
	"github.com/google/uuid"
	"go.mongodb.org/mongo-driver/bson"
)

// CreateCourse is the resolver for the createCourse field.
func (r *mutationResolver) CreateCourse(ctx context.Context, input model.CreateCourseInput) (*model.Course, error) {
	courseID := uuid.New().String()

	newCourse := &model.Course{
		ID:      courseID,
		Title:   input.Title,
		ClassID: "",
	}

	if input.Description != nil {
		newCourse.Description = input.Description
	}

	courseColl := db.Client.Database(db.DbName).Collection(db.CourseCollName)
	_, err := courseColl.InsertOne(context.Background(), newCourse)

	if err != nil {
		return nil, err
	}

	return newCourse, nil
}

// CreateTask is the resolver for the createTask field.
func (r *mutationResolver) CreateTask(ctx context.Context, input model.CreateTaskInput) (*model.Task, error) {
	taskID := uuid.New().String()

	newTask := &model.Task{
		ID:    taskID,
		Title: input.Title,
	}

	if input.Description != nil {
		newTask.Description = input.Description
	}

	if input.Deadline != nil {
		newTask.Deadline = input.Deadline
	}

	taskColl := db.Client.Database(db.DbName).Collection(db.TaskCollName)
	_, err := taskColl.InsertOne(context.Background(), newTask)

	if err != nil {
		return nil, err
	}

	return newTask, nil
}

// UpdateCourse is the resolver for the updateCourse field.
func (r *mutationResolver) UpdateCourse(ctx context.Context, input model.UpdateCourseInput) (*model.Course, error) {
	courseID := input.ID
	courseColl := db.Client.Database(db.DbName).Collection(db.CourseCollName)

	filter := bson.M{"id": courseID}
	existingCourse := &model.Course{}

	err := courseColl.FindOne(ctx, filter).Decode(existingCourse)
	if err != nil {
		return nil, fmt.Errorf("course not found")
	}
	if input.Title != "" {
		existingCourse.Title = input.Title
	}
	if input.Description != nil {
		existingCourse.Description = input.Description
	}

	_, err = courseColl.UpdateOne(ctx, filter, bson.M{"$set": existingCourse})
	if err != nil {
		return nil, fmt.Errorf("failed to update course")
	}

	return existingCourse, nil
}

// UpdateTask is the resolver for the updateTask field.
func (r *mutationResolver) UpdateTask(ctx context.Context, input model.UpdateTaskInput) (*model.Task, error) {
	taskID := input.ID
	taskColl := db.Client.Database(db.DbName).Collection(db.TaskCollName)

	filter := bson.M{"id": taskID}
	existingTask := &model.Task{}

	err := taskColl.FindOne(ctx, filter).Decode(existingTask)
	if err != nil {
		return nil, fmt.Errorf("task not found")
	}

	if input.Title != "" {
		existingTask.Title = input.Title
	}
	if input.Description != nil {
		existingTask.Description = input.Description
	}

	_, err = taskColl.UpdateOne(ctx, filter, bson.M{"$set": existingTask})

	if err != nil {
		return nil, fmt.Errorf("failed to update task")
	}

	return existingTask, nil
}

// DeleteCourse is the resolver for the deleteCourse field.
func (r *mutationResolver) DeleteCourse(ctx context.Context, id string) (*model.Course, error) {
	courseColl := db.Client.Database(db.DbName).Collection(db.CourseCollName)

	filter := bson.M{"id": id}
	deletedCourse := &model.Course{}

	err := courseColl.FindOneAndDelete(ctx, filter).Decode(deletedCourse)

	if err != nil {
		// Handle the error, for example, return an error if the course is not found.
		return nil, fmt.Errorf("course not found")
	}

	return deletedCourse, nil
}

// DeleteTask is the resolver for the deleteTask field.
func (r *mutationResolver) DeleteTask(ctx context.Context, id string) (*model.Task, error) {
	taskColl := db.Client.Database(db.DbName).Collection(db.TaskCollName)

	filter := bson.M{"id": id}
	deletedTask := &model.Task{}

	err := taskColl.FindOneAndDelete(ctx, filter).Decode(deletedTask)

	if err != nil {
		return nil, fmt.Errorf("task not found!")
	}

	return deletedTask, nil
}

// GetCourse is the resolver for the getCourse field.
func (r *queryResolver) GetCourse(ctx context.Context) (*model.Course, error) {
	panic(fmt.Errorf("not implemented: GetCourse - getCourse"))
}

// GetCourses is the resolver for the getCourses field.
func (r *queryResolver) GetCourses(ctx context.Context) ([]*model.Course, error) {
	panic(fmt.Errorf("not implemented: GetCourses - getCourses"))
}

// GetTask is the resolver for the getTask field.
func (r *queryResolver) GetTask(ctx context.Context) (*model.Task, error) {
	panic(fmt.Errorf("not implemented: GetTask - getTask"))
}

// GetTasks is the resolver for the getTasks field.
func (r *queryResolver) GetTasks(ctx context.Context) ([]*model.Task, error) {
	panic(fmt.Errorf("not implemented: GetTasks - getTasks"))
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }