package config

import (
	"context"
	"strconv"
	"time"

	"github.com/redis/go-redis/v9"
)

var Redis *redis.Client

func ConnectRedis(cfg Config) error {
	db, err := strconv.Atoi(cfg.RedisDB)
	if err != nil {
		return err
	}

	client := redis.NewClient(&redis.Options{
		Addr:         cfg.RedisHost + ":" + cfg.RedisPort,
		Password:     cfg.RedisPassword,
		DB:           db,
		DialTimeout:  3 * time.Second,
		ReadTimeout:  2 * time.Second,
		WriteTimeout: 2 * time.Second,
	})

	// Keep the client even when the initial ping fails.
	Redis = client

	ctx, cancel := context.WithTimeout(
		context.Background(),
		3*time.Second,
	)
	defer cancel()

	return client.Ping(ctx).Err()
}
