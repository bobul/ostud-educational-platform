package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.36

import (
	"context"
	"errors"
	"fmt"
	"github.com/bobul/ostud-educational-platform/db"
	"github.com/bobul/ostud-educational-platform/graph/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

// CreateCourse is the resolver for the createCourse field.
func (r *mutationResolver) CreateCourse(ctx context.Context, input model.CreateCourseInput) (*model.Course, error) {
	newCourse := &model.Course{
		ID:      primitive.NewObjectID().Hex(),
		Title:   input.Title,
		ClassID: "",
	}

	if input.Description != nil {
		newCourse.Description = input.Description
	}

	result, err := courseColl.InsertOne(context.Background(), newCourse)

	if err != nil {
		return nil, fmt.Errorf("unable to create course! check your model")
	}

	newCourseId := result.InsertedID.(primitive.ObjectID).Hex()

	return &model.Course{
		ID:          newCourseId,
		Title:       input.Title,
		Description: input.Description,
		ClassID:     newCourse.ClassID,
	}, nil
}

// CreateTask is the resolver for the createTask field.
func (r *mutationResolver) CreateTask(ctx context.Context, input model.CreateTaskInput) (*model.Task, error) {
	newTask := &model.Task{
		Title:    input.Title,
		CourseID: "",
	}

	if input.Description != nil {
		newTask.Description = input.Description
	}

	if input.Deadline != nil {
		newTask.Deadline = input.Deadline
	}

	result, err := taskColl.InsertOne(context.Background(), newTask)
	newTaskId := result.InsertedID.(primitive.ObjectID).Hex()

	if err != nil {
		return nil, fmt.Errorf("unable to create task! check your model")
	}

	return &model.Task{
		ID:          newTaskId,
		Title:       newTask.Title,
		Description: newTask.Description,
		Deadline:    newTask.Deadline,
		CourseID:    newTask.CourseID,
	}, nil
}

// UpdateCourse is the resolver for the updateCourse field.
func (r *mutationResolver) UpdateCourse(ctx context.Context, input model.UpdateCourseInput) (*model.Course, error) {
	existingCourse := &model.Course{}
	courseId, err := primitive.ObjectIDFromHex(input.ID)

	if err != nil {
		return nil, fmt.Errorf("invalid ID format")
	}

	filter := bson.M{"_id": courseId}

	if input.Title != "" {
		existingCourse.Title = input.Title
	}
	if input.Description != nil {
		existingCourse.Description = input.Description
	}

	err = courseColl.FindOneAndUpdate(ctx, filter, bson.M{"$set": existingCourse}).Decode(existingCourse)

	if err != nil {
		return nil, fmt.Errorf("failed to update course")
	}

	return existingCourse, nil
}

// UpdateTask is the resolver for the updateTask field.
func (r *mutationResolver) UpdateTask(ctx context.Context, input model.UpdateTaskInput) (*model.Task, error) {
	existingTask := &model.Task{}
	taskId, err := primitive.ObjectIDFromHex(input.ID)

	if err != nil {
		return nil, fmt.Errorf("invalid ID format")
	}

	filter := bson.M{"_id": taskId}

	if input.Title != "" {
		existingTask.Title = input.Title
	}
	if input.Description != nil {
		existingTask.Description = input.Description
	}

	err = taskColl.FindOneAndUpdate(ctx, filter, bson.M{"$set": existingTask}).Decode(existingTask)

	if err != nil {
		return nil, fmt.Errorf("failed to update task")
	}

	return existingTask, nil
}

// DeleteCourse is the resolver for the deleteCourse field.
func (r *mutationResolver) DeleteCourse(ctx context.Context, id string) (*model.Course, error) {
	courseId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid ID format")
	}
	filter := bson.M{"_id": courseId}
	deletedCourse := &model.Course{}

	err = courseColl.FindOneAndDelete(ctx, filter).Decode(deletedCourse)

	if err != nil {
		// Handle the error, for example, return an error if the course is not found.
		return nil, fmt.Errorf("course not found")
	}

	return deletedCourse, nil
}

// DeleteTask is the resolver for the deleteTask field.
func (r *mutationResolver) DeleteTask(ctx context.Context, id string) (*model.Task, error) {
	filter := bson.M{"id": id}
	deletedTask := &model.Task{}

	err := taskColl.FindOneAndDelete(ctx, filter).Decode(deletedTask)

	if err != nil {
		return nil, fmt.Errorf("task not found!")
	}

	return deletedTask, nil
}

// GetCourse is the resolver for the getCourse field.
func (r *queryResolver) GetCourse(ctx context.Context, id string) (*model.Course, error) {
	course := &model.Course{}
	courseId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return nil, fmt.Errorf("invalid ID format")
	}

	filter := bson.M{"_id": courseId}

	err = courseColl.FindOne(ctx, filter).Decode(course)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, fmt.Errorf("course not found")
		}
		return nil, err
	}

	return course, nil
}

// GetCourses is the resolver for the getCourses field.
func (r *queryResolver) GetCourses(ctx context.Context) ([]*model.Course, error) {
	cursor, err := courseColl.Find(ctx, bson.D{})
	if err != nil {
		return nil, fmt.Errorf("courses not found")
	}
	defer cursor.Close(ctx)

	var courses []*model.Course
	for cursor.Next(ctx) {
		var course model.Course
		if err := cursor.Decode(&course); err != nil {
			continue
		}

		courses = append(courses, &course)
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return courses, nil
}

// GetTask is the resolver for the getTask field.
func (r *queryResolver) GetTask(ctx context.Context, id string) (*model.Task, error) {
	task := &model.Task{}
	taskId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		fmt.Errorf("invalid ID format")
	}

	filter := bson.M{"_id": taskId}

	if err = taskColl.FindOne(ctx, filter).Decode(task); err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, fmt.Errorf("task not found")
		}
		return nil, err
	}

	return task, nil
}

// GetTasks is the resolver for the getTasks field.
func (r *queryResolver) GetTasks(ctx context.Context) ([]*model.Task, error) {
	cursor, err := taskColl.Find(ctx, bson.D{})

	if err != nil {
		return nil, fmt.Errorf("tasks not found")
	}
	defer cursor.Close(ctx)

	var tasks []*model.Task

	for cursor.Next(ctx) {
		var task model.Task
		if err := cursor.Decode(&task); err != nil {
			continue
		}
		tasks = append(tasks, &task)
	}
	return tasks, nil
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
var (
	courseColl = db.Client.Database(db.DbName).Collection(db.CourseCollName)
	taskColl   = db.Client.Database(db.DbName).Collection(db.TaskCollName)
)
