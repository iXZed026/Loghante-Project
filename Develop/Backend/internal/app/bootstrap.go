package app

import (
	"context"
	"log"
	"log/slog"

	"loghanteh-project/internal/auth"
	"loghanteh-project/internal/config"
	"loghanteh-project/internal/database"
	"loghanteh-project/internal/handlers"
	"loghanteh-project/internal/limiter"
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
			"failed to load env",
			"error",
			err,
		)

		return nil, err
	}

	if err := config.ConnectRedis(cfg); err != nil {
		logger.Error(
			"failed to connect redis",
			"error",
			err,
		)

		return nil, err
	}

	logger.Info(
		"Redis connected successfully!",
	)

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

	ticketRepository :=
		repositories.NewTicketRepository(
			db,
		)

	languageRepository :=
		repositories.NewLanguageRepository(
			db,
		)

	bookingRepository :=
		repositories.NewBookingRepository(
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

	profileService := services.NewProfileService(
		userRepo,
	)

	ticketService := services.NewTicketService(
		db,
		ticketRepository,
		languageRepository,
		bookingRepository,
	)

	//////////////
	// Handlers
	//////////////

	authHandler := handlers.NewAuthHandler(
		authService,
		logger,
	)

	profileHandler := handlers.NewProfileHandler(
		profileService,
		logger,
	)

	ticketHandler := handlers.NewTicketHandler(
		ticketService,
		logger,
	)

	//////////////
	// Rate Limiter
	//////////////

	rateLimiter := limiter.NewRedisLimiter(
		config.Redis,
	)

	//////////////
	// Router
	//////////////

	r := gin.Default()

	routes.SetupRoutes(
		r,
		logger,
		authHandler,
		profileHandler,
		ticketHandler,
		jwtService,
		rateLimiter,
	)

	return &App{
		Config:  cfg,
		Logger:  logger,
		Context: ctx,
		Cancel:  cancel,
		Router:  r,
	}, nil
}
