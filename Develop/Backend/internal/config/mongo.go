package config

import (
	"context"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

var DB *mongo.Client

func ConnectDB(cfg Config) error {

	uri := cfg.MongoURI

	ctx, cancell := context.WithTimeout(
		context.Background(),
		30*time.Second, //maximum wait 10 secound, if not connect, cancelled
	)

	defer cancell()

	client, err := mongo.Connect(
		options.Client().ApplyURI(uri),
	)

	if err != nil {
		return err
	}

	if err := client.Ping(ctx, nil); err != nil {
		return err
	}

	DB = client

	return nil

}
