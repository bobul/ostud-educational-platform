package database

import (
	"context"
	"errors"
	"fmt"
	"github.com/bobul/ostud-educational-platform/graph/model"
	"github.com/bobul/ostud-educational-platform/service"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"strings"
	"time"
)

func (db *DB) GetUserColumn() *mongo.Collection {
	return db.client.Database("ostud").Collection("users")
}
func (db *DB) GetCourseColumn() *mongo.Collection {
	return db.client.Database("ostud").Collection("courses")
}
func (db *DB) GetTaskColumn() *mongo.Collection {
	return db.client.Database("ostud").Collection("tasks")
}
func (db *DB) GetClassColumn() *mongo.Collection {
	return db.client.Database("ostud").Collection("classes")
}
func (db *DB) GetContext() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), 30*time.Second)
}

func (db *DB) UserLogin(email string, password string) (*model.Token, error) {
	user, err := db.GetUserByEmail(email)
	if err != nil {
		return nil, err
	}

	if err := service.ComparePassword(user.Password, password); err != nil {
		return nil, fmt.Errorf("wrong password")
	}

	accessToken, refreshToken, err := service.JwtGenerateTokens(email)
	if err != nil {
		return nil, err
	}

	return &model.Token{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (db *DB) UserRegister(input model.CreateUserInput) (*model.Token, error) {
	_, err := db.GetUserByEmail(input.Email)
	if err == nil {
		return nil, fmt.Errorf("you already have an account")
	}

	_, err = db.CreateUser(input)
	if err != nil {
		return nil, err
	}

	accessToken, refreshToken, err := service.JwtGenerateTokens(input.Email)
	if err != nil {
		return nil, err
	}

	return &model.Token{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}, nil
}

func (db *DB) CreateUser(input model.CreateUserInput) (*model.User, error) {
	ctx, cancel := db.GetContext()
	defer cancel()

	hashedPassword := service.HashPassword(input.Password)
	dateFromDateString, err := time.Parse(time.RFC3339, *input.Dob)

	if err != nil {
		return nil, fmt.Errorf("unable to parse date")
	}
	dob := primitive.NewDateTimeFromTime(dateFromDateString)
	dobPtr := &dob

	newUser := model.User{
		Role:      input.Role,
		Email:     strings.ToLower(input.Email),
		FirstName: input.FirstName,
		LastName:  input.LastName,
		Password:  hashedPassword,
		Rd:        primitive.NewDateTimeFromTime(time.Now()),
		Dob:       dobPtr,
	}

	result, err := db.GetUserColumn().InsertOne(ctx, newUser)

	newUserId := result.InsertedID.(primitive.ObjectID).Hex()

	if err != nil {
		return nil, fmt.Errorf("unable to create user! check your model")
	}

	return &model.User{
		ID:        newUserId,
		Role:      newUser.Role,
		Email:     newUser.Email,
		FirstName: newUser.FirstName,
		LastName:  newUser.LastName,
		Password:  newUser.Password,
		Rd:        newUser.Rd,
		Dob:       newUser.Dob,
	}, nil
}

func (db *DB) CreateCourse(input model.CreateCourseInput) (*model.Course, error) {
	ctx, cancel := db.GetContext()
	defer cancel()

	classId, err := primitive.ObjectIDFromHex(input.ClassID)

	if err != nil {
		return nil, fmt.Errorf("unable to get class id")
	}

	newCourse := &model.CourseObjectId{
		Title:   input.Title,
		ClassID: classId,
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
		ClassID:     newCourse.ClassID.Hex(),
	}, nil
}

func (db *DB) CreateTask(input model.CreateTaskInput) (*model.Task, error) {
	ctx, cancel := db.GetContext()
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

func (db *DB) CreateClass(input model.CreateClassInput) (*model.Class, error) {
	ctx, cancel := db.GetContext()
	defer cancel()

	newClass := &model.Class{
		Number:    input.Number,
		Letter:    input.Letter,
		TeacherID: "",
	}

	result, err := db.GetClassColumn().InsertOne(ctx, newClass)
	newClassId := result.InsertedID.(primitive.ObjectID).Hex()

	if err != nil {
		return nil, fmt.Errorf("unable to create class!")
	}

	return &model.Class{
		ID:        newClassId,
		Number:    newClass.Number,
		Letter:    newClass.Letter,
		TeacherID: newClass.TeacherID,
	}, nil
}

func (db *DB) UpdateCourse(input model.UpdateCourseInput) (*model.Course, error) {
	ctx, cancel := db.GetContext()
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
	ctx, cancel := db.GetContext()
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

func (db *DB) UpdateClass(input model.UpdateClassInput) (*model.Class, error) {
	ctx, cancel := db.GetContext()
	defer cancel()

	existingClass := &model.Class{}
	classId, err := primitive.ObjectIDFromHex(input.ID)

	if err != nil {
		return nil, fmt.Errorf("invalid ID format")
	}

	filter := bson.M{"_id": classId}

	if input.Letter != nil {
		existingClass.Letter = *input.Letter
	}

	if input.Number != nil {
		existingClass.Number = *input.Number
	}

	err = db.GetClassColumn().FindOneAndUpdate(ctx, filter, bson.M{"$set": existingClass}).Decode(existingClass)

	if err != nil {
		return nil, fmt.Errorf("failed to update class")
	}
	return existingClass, nil
}

func (db *DB) DeleteCourse(id string) (*model.Course, error) {
	ctx, cancel := db.GetContext()
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
	ctx, cancel := db.GetContext()
	defer cancel()

	taskId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid ID format")
	}
	filter := bson.M{"_id": taskId}
	deletedTask := &model.Task{}

	err = db.GetTaskColumn().FindOneAndDelete(ctx, filter).Decode(deletedTask)

	if err != nil {
		return nil, fmt.Errorf("task not found")
	}

	return deletedTask, nil
}

func (db *DB) DeleteClass(id string) (*model.Class, error) {
	ctx, cancel := db.GetContext()
	defer cancel()

	classId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, fmt.Errorf("invalid ID format")
	}
	filter := bson.M{"_id": classId}
	deletedClass := &model.Class{}

	err = db.GetClassColumn().FindOneAndDelete(ctx, filter).Decode(deletedClass)

	if err != nil {
		return nil, fmt.Errorf("class not found")
	}

	return deletedClass, nil
}

func (db *DB) GetUserByEmail(email string) (*model.User, error) {
	ctx, cancel := db.GetContext()
	defer cancel()

	user := &model.User{}

	filter := bson.M{"email": email}

	err := db.GetUserColumn().FindOne(ctx, filter).Decode(user)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, fmt.Errorf("user not found")
		}
		return nil, err
	}

	return user, nil
}

func (db *DB) GetCourse(id string) (*model.Course, error) {
	ctx, cancel := db.GetContext()
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
	ctx, cancel := db.GetContext()
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

func (db *DB) GetClass(id string) (*model.Class, error) {
	ctx, cancel := db.GetContext()
	defer cancel()

	class := &model.Class{}
	classId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		fmt.Errorf("invalid ID format")
	}

	filter := bson.M{"_id": classId}

	if err = db.GetClassColumn().FindOne(ctx, filter).Decode(class); err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, fmt.Errorf("class not found")
		}
		return nil, err
	}

	return class, err
}

func (db *DB) GetCourses() ([]*model.Course, error) {
	ctx, cancel := db.GetContext()
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
	ctx, cancel := db.GetContext()
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

func (db *DB) GetClasses() ([]*model.Class, error) {
	ctx, cancel := db.GetContext()
	defer cancel()

	cursor, err := db.GetClassColumn().Find(ctx, bson.D{})

	if err != nil {
		return nil, fmt.Errorf("classes not found")
	}
	defer cursor.Close(ctx)

	var classes []*model.Class

	for cursor.Next(ctx) {
		var class model.Class
		if err := cursor.Decode(&class); err != nil {
			continue
		}
		classes = append(classes, &class)
	}
	return classes, nil
}
