package cache

import (
	"context"
	"encoding/json"
	"log/slog"
	"time"

	"github.com/redis/go-redis/v9"
)

const DefaultTTL = time.Hour

func RememberJSON[T any](
	ctx context.Context,
	client *redis.Client,
	logger *slog.Logger,
	key string,
	ttl time.Duration,
	load func() (T, error),
) (T, error) {
	var zero T

	// Redis is optional: always allow database fallback.
	if client != nil {
		data, err := client.Get(ctx, key).Bytes()

		if err == nil {
			var cached T

			if err := json.Unmarshal(data, &cached); err == nil {
				return cached, nil
			}

			if logger != nil {
				logger.Warn(
					"invalid Redis cache value; loading from database",
					"key", key,
				)
			}
		} else if err != redis.Nil {
			if logger != nil {
				logger.Warn(
					"Redis read failed; loading from database",
					"key", key,
					"error", err,
				)
			}
		}
	}

	// Cache miss, unavailable Redis, or invalid cached JSON.
	value, err := load()
	if err != nil {
		return zero, err
	}

	// A cache write failure must not fail the API response.
	if client != nil {
		data, err := json.Marshal(value)
		if err != nil {
			if logger != nil {
				logger.Warn(
					"failed to encode cache value",
					"key", key,
					"error", err,
				)
			}

			return value, nil
		}

		if err := client.Set(ctx, key, data, ttl).Err(); err != nil {
			if logger != nil {
				logger.Warn(
					"Redis write failed",
					"key", key,
					"error", err,
				)
			}
		}
	}

	return value, nil
}

func DeletePattern(
	ctx context.Context,
	client *redis.Client,
	logger *slog.Logger,
	pattern string,
) error {
	if client == nil {
		return nil
	}

	var cursor uint64

	for {
		keys, nextCursor, err := client.Scan(
			ctx,
			cursor,
			pattern,
			100,
		).Result()
		if err != nil {
			if logger != nil {
				logger.Warn(
					"failed to scan Redis cache keys",
					"pattern", pattern,
					"error", err,
				)
			}
			return err
		}

		if len(keys) > 0 {
			if err := client.Del(ctx, keys...).Err(); err != nil {
				if logger != nil {
					logger.Warn(
						"failed to delete Redis cache keys",
						"pattern", pattern,
						"error", err,
					)
				}
				return err
			}
		}

		cursor = nextCursor
		if cursor == 0 {
			return nil
		}
	}
}
