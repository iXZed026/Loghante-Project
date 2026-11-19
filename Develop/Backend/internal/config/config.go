package config

import (
	"errors"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type Config struct {
	RedisHost         string
	RedisPort         string
	RedisPassword     string
	RedisDB           string
	Port              string
	DatabaseURL       string
	JwtSecret         string
	EmailWorkerCount  string
	EnableRateLimiter bool
	Environment       string
	CookieSecure      bool
	CookieSameSite    string
}

func Load() (Config, error) {
	// Load .env when running locally.
	// In Vercel, environment variables are provided by the platform.
	_ = godotenv.Load()

	enableRateLimiter := true

	if value := os.Getenv("ENABLE_RATE_LIMITER"); value != "" {
		parsed, err := strconv.ParseBool(value)
		if err != nil {
			return Config{}, errors.New(
				"ENABLE_RATE_LIMITER must be true or false",
			)
		}

		enableRateLimiter = parsed
	}

	environment := os.Getenv("ENVIRONMENT")
	if environment == "" {
		environment = "development"
	}

	var cookieSecure bool
	var cookieSameSite string

	switch environment {
	case "production":
		cookieSecure = true
		cookieSameSite = "none"
	default:
		cookieSecure = false
		cookieSameSite = "lax"
	}

	config := Config{
		RedisHost:         os.Getenv("REDIS_HOST"),
		RedisPort:         os.Getenv("REDIS_PORT"),
		RedisPassword:     os.Getenv("REDIS_PASSWORD"),
		RedisDB:           os.Getenv("REDIS_DB"),
		Port:              os.Getenv("PORT"),
		DatabaseURL:       os.Getenv("DATABASE_URL"),
		JwtSecret:         os.Getenv("JWT_SECRET"),
		EmailWorkerCount:  os.Getenv("EMAIL_WORKER_COUNT"),
		EnableRateLimiter: enableRateLimiter,
		Environment:       environment,
		CookieSecure:      cookieSecure,
		CookieSameSite:    cookieSameSite,
	}

	if config.Port == "" {
		return Config{}, errors.New("PORT is required")
	}

	if config.DatabaseURL == "" {
		return Config{}, errors.New("DATABASE_URL is required")
	}

	if config.JwtSecret == "" {
		return Config{}, errors.New("JWT_SECRET is required")
	}

	if config.EmailWorkerCount == "" {
		return Config{}, errors.New("EMAIL_WORKER_COUNT is required")
	}

	if config.EnableRateLimiter {
		if config.RedisHost == "" {
			return Config{}, errors.New("REDIS_HOST is required when rate limiter is enabled")
		}

		if config.RedisPort == "" {
			return Config{}, errors.New("REDIS_PORT is required when rate limiter is enabled")
		}
	}

	return config, nil
}
