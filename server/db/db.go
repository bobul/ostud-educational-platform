package db

import (
	"context"
	"fmt"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	DbName         = "ostud"
	CourseCollName = "courses"
	TaskCollName   = "tasks"
	MongoURI       = "mongodb://localhost:27017"
)

var (
	Client *mongo.Client
)

func init() {
	clientOptions := options.Client().ApplyURI(MongoURI)
	var err error
	Client, err = mongo.Connect(context.Background(), clientOptions)
	if err != nil {
		panic(err)
	}

	err = Client.Ping(context.Background(), nil)
	if err != nil {
		panic(err)
	}

	fmt.Println("Connected to MongoDB!")
}
