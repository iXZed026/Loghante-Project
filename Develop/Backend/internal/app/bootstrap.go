package app

import (
	"context"
	"log/slog"

	"loghanteh-project/internal/auth"
	"loghanteh-project/internal/config"
	"loghanteh-project/internal/database"
	"loghanteh-project/internal/handlers"
	"loghanteh-project/internal/limiter"
	"loghanteh-project/internal/repositories"
	"loghanteh-project/internal/reservation"
	"loghanteh-project/internal/routes"
	"loghanteh-project/internal/services"

	"github.com/gin-gonic/gin"
)

func New() (*App, error) {
	logger := slog.Default()

	cfg, err := config.Load()
	if err != nil {
		logger.Error("failed to load env", "error", err)
		return nil, err
	}

	// Context
	ctx, cancel := context.WithCancel(context.Background())

	// Redis: connect independently of the rate limiter.
	redisErr := config.ConnectRedis(cfg)
	if redisErr != nil {
		logger.Warn(
			"Redis is unavailable; cache will fall back to database",
			"error", redisErr,
		)
	} else {
		logger.Info("Redis connected successfully")
	}

	// Rate limiter
	var rateLimiter limiter.RateLimiter

	if cfg.EnableRateLimiter && redisErr == nil {
		rateLimiter = limiter.NewRedisLimiter(config.Redis)
		logger.Info("Redis rate limiter enabled")
	} else {
		rateLimiter = limiter.NewNoopLimiter()

		if cfg.EnableRateLimiter {
			logger.Warn(
				"Redis rate limiter unavailable; using no-op limiter",
			)
		} else {
			logger.Info("Rate limiter disabled")
		}
	}

	// Database
	db, err := database.Connect(cfg.DatabaseURL)
	if err != nil {
		cancel()
		return nil, err
	}

	logger.Info("PostgreSQL connected successfully")

	sqlDB, err := db.DB()
	if err != nil {
		cancel()
		return nil, err
	}

	if err := sqlDB.Ping(); err != nil {
		cancel()
		return nil, err
	}

	logger.Info("Database ping successful")

	// JWT
	jwtService := auth.NewJWTService(cfg.JwtSecret)

	// Repositories
	userRepo := repositories.NewUserRepository(db)
	refreshTokenRepo := repositories.NewRefreshTokenRepository(db)
	loginVerificationRepository := repositories.NewLoginVerificationRepository(db)
	registerVerificationRepository := repositories.NewRegisterVerificationRepository(db)
	forgetPasswordVerificationRepository := repositories.NewForgetPasswordVerificationRepository(db)
	ticketRepository := repositories.NewTicketRepository(db)
	languageRepository := repositories.NewLanguageRepository(db)
	bookingRepository := repositories.NewBookingRepository(db)
	customerRequestRepository := repositories.NewCustomerRequestRepository(db)
	discountCodeRepository := repositories.NewDiscountCodeRepository(db)

	// Services
	authService := services.NewAuthService(
		userRepo,
		refreshTokenRepo,
		jwtService,
		loginVerificationRepository,
		registerVerificationRepository,
		forgetPasswordVerificationRepository,
	)

	profileService := services.NewProfileService(userRepo)

	reservationService := reservation.NewService(
		db,
		bookingRepository,
	)

	seatResourceProvider := reservation.NewSeatResourceProvider()

	ticketService := services.NewTicketService(
		ticketRepository,
		languageRepository,
		bookingRepository,
		reservationService,
		seatResourceProvider,
		config.Redis,
		logger,
	)

	customerRequestService := services.NewCustomerRequestService(
		customerRequestRepository,
	)

	discountCodeService := services.NewDiscountCodeService(
		discountCodeRepository,
	)

	// Handlers
	authHandler := handlers.NewAuthHandler(authService, logger)
	profileHandler := handlers.NewProfileHandler(profileService, logger)
	ticketHandler := handlers.NewTicketHandler(ticketService, logger)

	customerRequestHandler := handlers.NewCustomerRequestHandler(
		customerRequestService,
		logger,
	)

	discountCodeHandler := handlers.NewDiscountCodeHandler(
		discountCodeService,
		logger,
	)

	// Router
	r := gin.Default()

	routes.SetupRoutes(
		r,
		logger,
		authHandler,
		profileHandler,
		ticketHandler,
		customerRequestHandler,
		discountCodeHandler,
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
