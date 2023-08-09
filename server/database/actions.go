package database

import (
	"context"
	"errors"
	"fmt"
	"github.com/bobul/ostud-educational-platform/graph/model"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"time"
)

func (db *DB) GetCourseColumn() *mongo.Collection {
	return db.client.Database("ostud").Collection("courses")
}
func (db *DB) GetTaskColumn() *mongo.Collection {
	return db.client.Database("ostud").Collection("tasks")
}

func (db *DB) CreateCourse(input model.CreateCourseInput) (*model.Course, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	newCourse := &model.Course{
		Title:   input.Title,
		ClassID: "",
	}

	if input.Description != nil {
		newCourse.Description = input.Description
	}

	result, err := db.GetCourseColumn().InsertOne(ctx, newCourse)

	newCourseId := result.InsertedID.(primitive.ObjectID).Hex()

	if err != nil {
		return nil, fmt.Errorf("unable to create course! check your model")
	}

	return &model.Course{
		ID:          newCourseId,
		Title:       newCourse.Title,
		Description: input.Description,
		ClassID:     newCourse.ClassID,
	}, nil
}

func (db *DB) CreateTask(input model.CreateTaskInput) (*model.Task, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

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

	result, err := db.GetTaskColumn().InsertOne(ctx, newTask)
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

func (db *DB) UpdateCourse(input model.UpdateCourseInput) (*model.Course, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

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

	err = db.GetCourseColumn().FindOneAndUpdate(ctx, filter, bson.M{"$set": existingCourse}).Decode(existingCourse)

	if err != nil {
		return nil, fmt.Errorf("failed to update course")
	}

	return existingCourse, nil
}

func (db *DB) UpdateTask(input model.UpdateTaskInput) (*model.Task, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

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

	err = db.GetTaskColumn().FindOneAndUpdate(ctx, filter, bson.M{"$set": existingTask}).Decode(existingTask)

	if err != nil {
		return nil, fmt.Errorf("failed to update task")
	}

	return existingTask, nil
}

func (db *DB) DeleteCourse(id string) (*model.Course, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	courseId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid ID format")
	}
	filter := bson.M{"_id": courseId}
	deletedCourse := &model.Course{}

	err = db.GetCourseColumn().FindOneAndDelete(ctx, filter).Decode(deletedCourse)

	if err != nil {
		// Handle the error, for example, return an error if the course is not found.
		return nil, fmt.Errorf("course not found")
	}

	return deletedCourse, nil
}

func (db *DB) DeleteTask(id string) (*model.Task, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	filter := bson.M{"id": id}
	deletedTask := &model.Task{}

	err := db.GetTaskColumn().FindOneAndDelete(ctx, filter).Decode(deletedTask)

	if err != nil {
		return nil, fmt.Errorf("task not found!")
	}

	return deletedTask, nil
}

func (db *DB) GetCourse(id string) (*model.Course, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	course := &model.Course{}
	courseId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		return nil, fmt.Errorf("invalid ID format")
	}

	filter := bson.M{"_id": courseId}

	err = db.GetCourseColumn().FindOne(ctx, filter).Decode(course)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, fmt.Errorf("course not found")
		}
		return nil, err
	}

	return course, nil
}

func (db *DB) GetTask(id string) (*model.Task, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	task := &model.Task{}
	taskId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		fmt.Errorf("invalid ID format")
	}

	filter := bson.M{"_id": taskId}

	if err = db.GetTaskColumn().FindOne(ctx, filter).Decode(task); err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, fmt.Errorf("task not found")
		}
		return nil, err
	}

	return task, nil
}

func (db *DB) GetCourses() ([]*model.Course, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	cursor, err := db.GetCourseColumn().Find(ctx, bson.D{})
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

func (db *DB) GetTasks() ([]*model.Task, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	cursor, err := db.GetTaskColumn().Find(ctx, bson.D{})

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
