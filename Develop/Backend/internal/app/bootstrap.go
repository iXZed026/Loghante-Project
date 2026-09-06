package app

import (
	"context"
	"log"
	"log/slog"

	"loghanteh-project/internal/auth"
	"loghanteh-project/internal/config"
	"loghanteh-project/internal/database"
	"loghanteh-project/internal/handlers"
	"loghanteh-project/internal/repositories"
	"loghanteh-project/internal/routes"
	"loghanteh-project/internal/services"

	"github.com/gin-gonic/gin"
)

func New() (*App, error) {

	logger := slog.Default()

	cfg, err := config.Load()
	if err != nil {
		logger.Error(
			"Failed to Load env",
			"err", err,
		)

		return nil, err
	}

	ctx, cancel := context.WithCancel(
		context.Background(),
	)

	db, err := database.Connect(cfg.DatabaseURL)
	if err != nil {
		cancel()

		log.Fatal(
			"failed to connect database:",
			err,
		)
	}

	logger.Info(
		"PostgreSQL connected successfully!",
	)

	sqlDB, err := db.DB()
	if err != nil {
		cancel()

		log.Fatal(
			"failed to get sql database:",
			err,
		)
	}

	if err := sqlDB.Ping(); err != nil {
		cancel()

		log.Fatal(
			"database ping failed:",
			err,
		)
	}

	logger.Info(
		"Database ping successful!",
	)

	//////////////
	// JWT
	//////////////

	jwtService := auth.NewJWTService(
		cfg.JwtSecret,
	)

	//////////////
	// Repositories
	//////////////

	userRepo := repositories.NewUserRepository(
		db,
	)

	refreshTokenRepo :=
		repositories.NewRefreshTokenRepository(
			db,
		)

	loginVerificationRepository :=
		repositories.NewLoginVerificationRepository(
			db,
		)

	registerVerificationRepository :=
		repositories.NewRegisterVerificationRepository(
			db,
		)

	forgetPasswordVerificationRepository :=
		repositories.NewForgetPasswordVerificationRepository(
			db,
		)

	//////////////
	// Services
	//////////////

	authService := services.NewAuthService(
		userRepo,
		refreshTokenRepo,
		jwtService,
		loginVerificationRepository,
		registerVerificationRepository,
		forgetPasswordVerificationRepository,
	)

	//////////////
	// Handlers
	//////////////

	authHandler := handlers.NewAuthHandler(
		authService,
		logger,
	)

	//////////////
	// Router
	//////////////

	r := gin.Default()

	routes.SetupRoutes(
		r,
		logger,
		authHandler,
		jwtService,
	)

	return &App{
		Config:  cfg,
		Logger:  logger,
		Context: ctx,
		Cancel:  cancel,
		Router:  r,
	}, nil
}
