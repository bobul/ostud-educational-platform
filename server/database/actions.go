package database

import (
	"context"
	"errors"
	"fmt"
	"github.com/bobul/ostud-educational-platform/graph/model"
	"github.com/bobul/ostud-educational-platform/service"
	"github.com/dgryski/trifles/uuid"
	"github.com/go-chi/chi/v5"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"net/http"
	"slices"
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
func (db *DB) GetNewsColumn() *mongo.Collection {
	return db.client.Database("ostud").Collection("news")
}
func (db *DB) GetSessionColumn() *mongo.Collection {
	return db.client.Database("ostud").Collection("sessions")
}
func (db *DB) GetContext() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), 30*time.Second)
}

func (db *DB) NewSession(ctx context.Context, user *model.User) (*model.AuthResponse, *model.Session, error) {
	writer, _ := ctx.Value("httpWriter").(http.ResponseWriter)
	accessToken, refreshToken, err := service.JwtGenerateTokens(user)
	if err != nil {
		return nil, nil, err
	}

	newSession := &model.Session{
		UserID:       user.ID,
		RefreshToken: refreshToken,
		ExpiresIn:    int(time.Now().Add(time.Hour * 24 * 7).Unix()),
	}

	filter := bson.M{"userid": user.ID}

	cursor, err := db.GetSessionColumn().Find(ctx, filter)
	if err != nil {
		return nil, nil, err
	}
	var sessions []*model.Session

	err = cursor.All(ctx, &sessions)
	if err != nil {
		return nil, nil, err
	}

	if len(sessions) >= 5 {
		_, err = db.GetSessionColumn().DeleteMany(ctx, filter)
	}

	_, err = db.GetSessionColumn().InsertOne(ctx, newSession)
	if err != nil {
		return nil, nil, err
	}

	refreshCookie := &http.Cookie{
		Name:     "refreshToken",
		Value:    refreshToken,
		HttpOnly: true,
		Path:     "/",
		Domain:   "localhost",
		Expires:  time.Now().Add(time.Hour * 24 * 7),
	}

	http.SetCookie(writer, refreshCookie)

	return &model.AuthResponse{
		Tokens: &model.Token{
			AccessToken:  accessToken,
			RefreshToken: refreshToken,
		},
		User: user,
	}, newSession, nil
}

func (db *DB) Refresh(ctx context.Context) (*model.AuthResponse, error) {
	writer, _ := ctx.Value("httpWriter").(http.ResponseWriter)
	refreshTokenCookie := ctx.Value("refreshToken")
	if refreshTokenCookie == nil {
		http.Error(writer, "Unauthorized", http.StatusUnauthorized)
		return nil, fmt.Errorf("unauthorized")
	}
	oldRefreshToken := refreshTokenCookie.(string)

	username, err := service.JwtParseToken(oldRefreshToken)

	filter := bson.M{"refreshtoken": oldRefreshToken}
	session := db.GetSessionColumn().FindOne(ctx, filter)
	if err != nil || session.Err() != nil {
		http.Error(writer, "Unauthorized", http.StatusUnauthorized)
		return nil, fmt.Errorf("unauthorized")
	}

	_, err = db.GetSessionColumn().DeleteOne(ctx, filter)
	if err != nil {
		return nil, err
	}

	user, err := db.GetUserByEmail(username)
	if err != nil {
		return nil, err
	}

	authResponse, _, err := db.NewSession(ctx, user)

	return authResponse, nil
}

func (db *DB) UserLogin(ctx context.Context, email string, password string) (*model.AuthResponse, error) {
	user, err := db.GetUserByEmail(email)
	if err != nil {
		return nil, err
	}

	if err := service.ComparePassword(user.Password, password); err != nil {
		return nil, fmt.Errorf("wrong password")
	}

	authResponse, _, err := db.NewSession(ctx, user)

	return authResponse, nil
}

func (db *DB) UserRegister(ctx context.Context, mailService *service.MailService, input model.CreateUserInput) (*model.AuthResponse, error) {
	_, errF := db.GetUserByEmail(input.Email)

	if errF == nil {
		return nil, fmt.Errorf("you already have an account")
	}

	activationLink := uuid.UUIDv4()
	mailService.SendActivationMessage(input.Email, "http://localhost:8080/api/activate/"+activationLink)

	user, err := db.CreateUser(input, activationLink)
	if err != nil {
		return nil, err
	}

	authResponse, _, err := db.NewSession(ctx, user)

	return authResponse, nil
}

func (db *DB) UserActivate(w http.ResponseWriter, r *http.Request) {
	ctx, cancel := db.GetContext()
	defer cancel()

	activationLink := chi.URLParam(r, "activationLink")

	if activationLink == "" {
		http.Error(w, "Missing activation token in url", http.StatusBadRequest)
		return
	}

	filter := bson.M{"activationlink": activationLink}
	update := bson.M{
		"$set": bson.M{"isactivate": true},
	}
	updatedUser := &model.User{}
	err := db.GetUserColumn().FindOneAndUpdate(ctx, filter, update).Decode(&updatedUser)
	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			http.Error(w, "user not found", http.StatusBadRequest)
			return
		}
	}

	redirectLink := "http://localhost:5173/profile"

	http.Redirect(w, r, redirectLink, http.StatusSeeOther)
}

func (db *DB) UserLogout(ctx context.Context) (bool, error) {
	writer, _ := ctx.Value("httpWriter").(http.ResponseWriter)
	refreshTokenCookie := ctx.Value("refreshToken")
	if refreshTokenCookie == nil {
		http.Error(writer, "Unauthorized", http.StatusUnauthorized)
		return false, fmt.Errorf("unauthorized")
	}
	oldRefreshToken := refreshTokenCookie.(string)

	filter := bson.M{"refreshtoken": oldRefreshToken}
	session := db.GetSessionColumn().FindOne(ctx, filter)

	if session.Err() != nil {
		http.Error(writer, "Unauthorized", http.StatusUnauthorized)
		return false, fmt.Errorf("unauthorized")
	}

	_, err := db.GetSessionColumn().DeleteOne(ctx, filter)
	if err != nil {
		return false, err
	}

	return true, nil
}

func (db *DB) CreateUser(input model.CreateUserInput, activationLink string) (*model.User, error) {
	ctx, cancel := db.GetContext()
	defer cancel()

	hashedPassword := service.HashPassword(input.Password)
	dateFromDateString, err := time.Parse("02.01.2006", *input.Dob)
	if err != nil {
		return nil, fmt.Errorf("unable to parse date")
	}
	dob := primitive.NewDateTimeFromTime(dateFromDateString)
	dobPtr := &dob

	newUser := model.UserDateTime{
		Role:           input.Role,
		Email:          strings.ToLower(input.Email),
		FirstName:      input.FirstName,
		LastName:       input.LastName,
		Password:       hashedPassword,
		Rd:             primitive.NewDateTimeFromTime(time.Now()),
		Dob:            dobPtr,
		ActivationLink: activationLink,
		IsActivate:     false,
	}
	result, err := db.GetUserColumn().InsertOne(ctx, newUser)

	newUserId := result.InsertedID.(primitive.ObjectID).Hex()
	newRd := newUser.Rd.Time().Format("02.01.2006")
	newDob := newUser.Dob.Time().Format("02.01.2006")

	if err != nil {
		return nil, fmt.Errorf("unable to create user! check your model")
	}

	return &model.User{
		ID:             newUserId,
		Role:           newUser.Role,
		Email:          newUser.Email,
		FirstName:      newUser.FirstName,
		LastName:       newUser.LastName,
		Password:       newUser.Password,
		Image:          newUser.Image,
		Rd:             newRd,
		Dob:            &newDob,
		ActivationLink: newUser.ActivationLink,
		IsActivate:     newUser.IsActivate,
	}, nil
}

func (db *DB) GetUserById(ctx context.Context, id string) (*model.User, error) {
	writer, _ := ctx.Value("httpWriter").(http.ResponseWriter)

	user := &model.UserDateTime{}

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		http.Error(writer, "User not found!", http.StatusNotFound)
		return nil, fmt.Errorf("incorrect format of id! user not found")
	}

	filter := bson.M{"_id": objectID}

	err = db.GetUserColumn().FindOne(ctx, filter).Decode(user)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			http.Error(writer, "User not found!", http.StatusNotFound)
			return nil, fmt.Errorf("user not found")
		}
		return nil, err
	}

	newRd := user.Rd.Time().Format("02.01.2006")
	newDob := user.Dob.Time().Format("02.01.2006")

	return &model.User{
		ID:             user.ID,
		Role:           user.Role,
		Email:          user.Email,
		FirstName:      user.FirstName,
		LastName:       user.LastName,
		Password:       user.Password,
		Image:          user.Image,
		Rd:             newRd,
		Dob:            &newDob,
		ActivationLink: user.ActivationLink,
		IsActivate:     user.IsActivate,
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

func (db *DB) CreatePieceOfNews(input model.CreatePieceOfNewsInput) (*model.PieceOfNews, error) {
	ctx, cancel := db.GetContext()
	defer cancel()

	teacherId, err := primitive.ObjectIDFromHex(input.TeacherID)

	if err != nil {
		return nil, fmt.Errorf("unable to get teacher id")
	}

	doc := primitive.NewDateTimeFromTime(time.Now())

	newPieceOfNews := &model.PieceOfNewsDateTimeAndObjectId{
		Title:          input.Title,
		Description:    input.Description,
		TeacherID:      teacherId,
		TeacherName:    input.TeacherName,
		TeacherSurname: input.TeacherSurname,
		DateOfCreation: doc,
	}

	result, err := db.GetNewsColumn().InsertOne(ctx, newPieceOfNews)

	newPieceOfNewsId := result.InsertedID.(primitive.ObjectID).Hex()

	if err != nil {
		return nil, fmt.Errorf("unable to create a piece of news! check your model")
	}

	newDoc := newPieceOfNews.DateOfCreation.Time().Format("2006-01-02 15:04:05")

	return &model.PieceOfNews{
		ID:             newPieceOfNewsId,
		Title:          newPieceOfNews.Title,
		Description:    newPieceOfNews.Description,
		TeacherID:      newPieceOfNews.TeacherID.Hex(),
		TeacherName:    newPieceOfNews.TeacherName,
		TeacherSurname: newPieceOfNews.TeacherSurname,
		DateOfCreation: newDoc,
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

	teacher, err := db.GetUserById(ctx, input.TeacherID)
	if err != nil {
		return nil, fmt.Errorf("unable to find teacher")
	}

	newClass := &model.Class{
		Number:   input.Number,
		Letter:   input.Letter,
		Students: []string{},
		Teachers: []string{teacher.ID},
	}

	result, err := db.GetClassColumn().InsertOne(ctx, newClass)
	newClassId := result.InsertedID.(primitive.ObjectID).Hex()

	if err != nil {
		return nil, fmt.Errorf("unable to create class")
	}

	return &model.Class{
		ID:       newClassId,
		Number:   newClass.Number,
		Letter:   newClass.Letter,
		Students: newClass.Students,
		Teachers: newClass.Teachers,
	}, nil
}

func (db *DB) UpdateUser(mailService *service.MailService, input model.UpdateUserInput) (*model.User, error) {
	ctx, cancel := db.GetContext()
	defer cancel()
	user, err := db.GetUserById(ctx, input.ID)
	if err != nil {
		return nil, fmt.Errorf("user not found")
	}

	update := bson.M{"$set": bson.M{}}

	if input.FirstName != "" {
		update["$set"].(bson.M)["firstname"] = input.FirstName
	}

	if input.LastName != "" {
		update["$set"].(bson.M)["lastname"] = input.LastName
	}
	if input.Email != "" {
		if user.Email != input.Email {
			activationLink := uuid.UUIDv4()
			update["$set"].(bson.M)["email"] = input.Email
			update["$set"].(bson.M)["isactivate"] = false
			update["$set"].(bson.M)["activationlink"] = activationLink
			mailService.SendActivationMessage(input.Email, "http://localhost:8080/api/activate/"+activationLink)
		}
	}
	if *input.Password != "" {
		update["$set"].(bson.M)["password"] = service.HashPassword(*input.Password)
	}
	if input.Image != nil {
		update["$set"].(bson.M)["image"] = *input.Image
	}

	objectID, err := primitive.ObjectIDFromHex(input.ID)
	if err != nil {
		return nil, err
	}

	_, err = db.GetUserColumn().UpdateByID(ctx, objectID, update)
	if err != nil {
		fmt.Print(err)
		return nil, fmt.Errorf("failed to update user")
	}

	user, err = db.GetUserById(ctx, input.ID)
	if err != nil {
		return nil, fmt.Errorf("user not found")
	}

	return user, nil
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

	setupClass, err := db.GetClassById(ctx, input.ID)

	existingClass.Students = setupClass.Students
	existingClass.Teachers = setupClass.Teachers

	err = db.GetClassColumn().FindOneAndUpdate(ctx, filter, bson.M{"$set": existingClass}).Decode(existingClass)

	if err != nil {
		return nil, fmt.Errorf("failed to update class")
	}

	updatedClass, err := db.GetClass(input.ID)

	if err != nil {
		return nil, fmt.Errorf("failed to update class")
	}

	return updatedClass, nil
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

	user := &model.UserDateTime{}

	filter := bson.M{"email": email}

	err := db.GetUserColumn().FindOne(ctx, filter).Decode(user)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, fmt.Errorf("user not found")
		}
		return nil, err
	}

	newRd := user.Rd.Time().Format("02.01.2006")
	newDob := user.Dob.Time().Format("02.01.2006")

	if err != nil {
		return nil, fmt.Errorf("unable to create user! check your model")
	}

	return &model.User{
		ID:             user.ID,
		Role:           user.Role,
		Email:          user.Email,
		FirstName:      user.FirstName,
		LastName:       user.LastName,
		Password:       user.Password,
		Image:          user.Image,
		Rd:             newRd,
		Dob:            &newDob,
		ActivationLink: user.ActivationLink,
		IsActivate:     user.IsActivate,
	}, nil
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

func (db *DB) GetNews() ([]*model.PieceOfNews, error) {
	ctx, cancel := db.GetContext()
	defer cancel()

	cursor, err := db.GetNewsColumn().Find(ctx, bson.D{})
	if err != nil {
		return nil, fmt.Errorf("news not found")
	}
	defer cursor.Close(ctx)

	var news []*model.PieceOfNews
	for cursor.Next(ctx) {
		var pieceOfNews model.PieceOfNewsDateTimeAndObjectId
		if err := cursor.Decode(&pieceOfNews); err != nil {
			continue
		}

		newDoc := pieceOfNews.DateOfCreation.Time().Format("2006-01-02 15:04:05")

		news = append(news, &model.PieceOfNews{
			ID:             pieceOfNews.ID,
			Title:          pieceOfNews.Title,
			Description:    pieceOfNews.Description,
			TeacherID:      pieceOfNews.TeacherID.Hex(),
			TeacherName:    pieceOfNews.TeacherName,
			TeacherSurname: pieceOfNews.TeacherSurname,
			DateOfCreation: newDoc,
		})
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}
	slices.Reverse(news)
	return news, nil
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

func (db *DB) GetClassesByTeacherId(ctx context.Context, teacherID string) ([]*model.Class, error) {
	writer, _ := ctx.Value("httpWriter").(http.ResponseWriter)

	filter := bson.M{
		"teachers": bson.M{
			"$elemMatch": bson.M{"$eq": teacherID},
		},
	}

	cursor, err := db.GetClassColumn().Find(ctx, filter)

	if err != nil {
		http.Error(writer, "Class not found!", http.StatusNotFound)
		return nil, fmt.Errorf("incorrect format of id! class not found")
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

func (db *DB) GetNewsByTeacherId(ctx context.Context, teacherID string) ([]*model.PieceOfNews, error) {
	writer, _ := ctx.Value("httpWriter").(http.ResponseWriter)

	objectID, err := primitive.ObjectIDFromHex(teacherID)

	if err != nil {
		http.Error(writer, "News not found!", http.StatusNotFound)
		return nil, fmt.Errorf("incorrect format of id! news not found")
	}

	filter := bson.M{"teacher_id": objectID}

	cursor, err := db.GetNewsColumn().Find(ctx, filter)

	if err != nil {
		http.Error(writer, "News not found!", http.StatusNotFound)
		return nil, fmt.Errorf("incorrect format of id! news not found")
	}

	defer cursor.Close(ctx)

	var news []*model.PieceOfNews
	for cursor.Next(ctx) {
		var pieceOfNews model.PieceOfNewsDateTimeAndObjectId
		if err := cursor.Decode(&pieceOfNews); err != nil {
			continue
		}

		newDoc := pieceOfNews.DateOfCreation.Time().Format("2006-01-02 15:04:05")

		news = append(news, &model.PieceOfNews{
			ID:             pieceOfNews.ID,
			Title:          pieceOfNews.Title,
			Description:    pieceOfNews.Description,
			TeacherID:      pieceOfNews.TeacherID.Hex(),
			TeacherName:    pieceOfNews.TeacherName,
			TeacherSurname: pieceOfNews.TeacherSurname,
			DateOfCreation: newDoc,
		})
	}

	if err := cursor.Err(); err != nil {
		return nil, err
	}

	return news, nil
}

func (db *DB) GetPieceOfNewsById(ctx context.Context, id string) (*model.PieceOfNews, error) {
	writer, _ := ctx.Value("httpWriter").(http.ResponseWriter)

	pieceOfNews := &model.PieceOfNewsDateTimeAndObjectId{}

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		http.Error(writer, "Class not found!", http.StatusNotFound)
		return nil, fmt.Errorf("incorrect format of id! class not found")
	}

	filter := bson.M{"_id": objectID}

	err = db.GetNewsColumn().FindOne(ctx, filter).Decode(pieceOfNews)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			http.Error(writer, "piece of news not found!", http.StatusNotFound)
			return nil, fmt.Errorf("piece of news not found")
		}
		return nil, err
	}

	newDoc := pieceOfNews.DateOfCreation.Time().Format("2006-01-02 15:04:05")

	return &model.PieceOfNews{
		ID:             pieceOfNews.ID,
		Title:          pieceOfNews.Title,
		Description:    pieceOfNews.Description,
		TeacherID:      pieceOfNews.TeacherID.Hex(),
		TeacherName:    pieceOfNews.TeacherName,
		TeacherSurname: pieceOfNews.TeacherSurname,
		DateOfCreation: newDoc,
	}, nil
}

func (db *DB) GetClassById(ctx context.Context, id string) (*model.Class, error) {
	writer, _ := ctx.Value("httpWriter").(http.ResponseWriter)

	class := &model.Class{}

	objectID, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		http.Error(writer, "Class not found!", http.StatusNotFound)
		return nil, fmt.Errorf("incorrect format of id! class not found")
	}

	filter := bson.M{"_id": objectID}

	err = db.GetClassColumn().FindOne(ctx, filter).Decode(class)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			http.Error(writer, "Class not found!", http.StatusNotFound)
			return nil, fmt.Errorf("class not found")
		}
		return nil, err
	}

	return &model.Class{
		ID:       class.ID,
		Number:   class.Number,
		Letter:   class.Letter,
		Students: class.Students,
		Teachers: class.Teachers,
	}, nil
}

func (db *DB) GetCoursesByClassId(ctx context.Context, classID string) ([]*model.Course, error) {
	writer, _ := ctx.Value("httpWriter").(http.ResponseWriter)

	classObjectId, err := primitive.ObjectIDFromHex(classID)

	if err != nil {
		http.Error(writer, "Course not found!", http.StatusNotFound)
		return nil, fmt.Errorf("incorrect format of id! course not found")
	}

	filter := bson.M{"class_id": classObjectId}

	cursor, err := db.GetCourseColumn().Find(ctx, filter)

	if err != nil {
		return nil, err
	}

	defer cursor.Close(ctx)

	var courses []*model.Course

	for cursor.Next(ctx) {
		var course model.CourseObjectId
		if err := cursor.Decode(&course); err != nil {
			continue
		}
		courses = append(courses, &model.Course{
			ID:          course.ID,
			Title:       course.Title,
			Description: course.Description,
			ClassID:     course.ClassID.Hex(),
		})
	}
	return courses, nil
}

func (db *DB) GetCourseById(ctx context.Context, id string) (*model.Course, error) {
	writer, _ := ctx.Value("httpWriter").(http.ResponseWriter)

	course := &model.CourseObjectId{}
	courseId, err := primitive.ObjectIDFromHex(id)

	if err != nil {
		http.Error(writer, "Course not found!", http.StatusNotFound)
		return nil, fmt.Errorf("incorrect format of id! course not found")
	}

	filter := bson.M{"_id": courseId}

	err = db.GetCourseColumn().FindOne(ctx, filter).Decode(course)

	if err != nil {
		if errors.Is(err, mongo.ErrNoDocuments) {
			return nil, fmt.Errorf("course not found")
		}
		return nil, err
	}

	return &model.Course{
		ID:          course.ID,
		Title:       course.Title,
		Description: course.Description,
		ClassID:     course.ClassID.Hex(),
	}, nil
}
