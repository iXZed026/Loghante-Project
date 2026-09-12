package app

import (
	"context"
	"log/slog"
	"museum_ticket/internal/auth"
	"museum_ticket/internal/config"
	"museum_ticket/internal/handlers"
	"museum_ticket/internal/limiter"
	"museum_ticket/internal/mail"
	"museum_ticket/internal/queue"
	"museum_ticket/internal/repositories"
	"museum_ticket/internal/routes"
	"museum_ticket/internal/services"
	"museum_ticket/internal/storage"
	"museum_ticket/internal/upload"
	customValidator "museum_ticket/internal/validator"
	"museum_ticket/internal/worker"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	playground "github.com/go-playground/validator/v10"
)

func New() (*App, error) {
	logger := slog.Default()

	cfg, err := config.Load()

	if err != nil {
		logger.Error(
			"load config error",
			"error",
			err,
		)
		return nil, err
	}

	ctx, cancel := context.WithCancel(
		context.Background(),
	)

	// --------------------
	// Database
	// --------------------

	if err := config.ConnectDB(cfg); err != nil {
		logger.Error(
			"database connection error",
			"error",
			err,
		)
		return nil, err
	}

	db := config.DB.Database("golang_db")

	// --------------------
	// Redis
	// --------------------

	if err := config.ConnectRedis(cfg); err != nil {
		logger.Error(
			"redis connection error",
			"error",
			err,
		)
		return nil, err
	}

	redisClient := config.Redis

	// --------------------
	// Repositories
	// --------------------

	ticketRepo :=
		repositories.NewMongoTicketRepository(
			db,
			logger,
		)

	userRepo :=
		repositories.NewMongoUserRepository(
			db,
		)

	refreshTokenRepo :=
		repositories.NewMongoRefreshTokenRepository(
			db,
		)

	// --------------------
	// Queue
	// --------------------

	redisQueue :=
		queue.NewRedisQueue(
			redisClient,
		)

	failQueue :=
		queue.NewFailQueue(
			redisClient,
		)

	// --------------------
	// RedisLimiter
	// --------------------

	redisLimiter := limiter.NewRedisLimiter(redisClient)

	// --------------------
	// Storage
	// --------------------

	localStorage :=
		storage.NewLocalStorage(
			cfg.UploadBasePath,
		)

	// --------------------
	// Services
	// --------------------

	jwtService :=
		auth.NewJWTService(
			cfg.JwtSecret,
		)

	ticketService :=
		services.NewTicketService(
			ticketRepo,
			redisQueue,
			logger,
		)

	authService :=
		services.NewAuthService(
			userRepo,
			refreshTokenRepo,
			jwtService,
		)

	uploadService :=
		upload.NewService(
			localStorage,
		)

	// --------------------
	// Handlers
	// --------------------

	ticketHandler :=
		handlers.NewTicketHandler(
			ticketService,
			logger,
		)

	authHandler :=
		handlers.NewAuthHandler(
			authService,
		)

	uploadHandler := handlers.NewUploadHandler(
		uploadService,
		logger,
	)

	// --------------------
	// Mail
	// --------------------

	mailer := mail.NewSMTPMailer()

	emailWorker :=
		worker.NewEmailWorker(
			redisQueue,
			failQueue,
			mailer,
			logger,
			cfg.EmailWorkerCount,
		)

	// --------------------
	// Router
	// --------------------

	r := gin.New()

	if v, ok := binding.Validator.Engine().(*playground.Validate); ok {

		if err := customValidator.Register(v); err != nil {
			return nil, err
		}

	}

	routes.SetupRoutes(
		r,
		ticketHandler,
		logger,
		authHandler,
		jwtService,
		redisLimiter,
		uploadHandler,
	)

	app := &App{

		Config: cfg,
		Logger: logger,

		Context: ctx,
		Cancel:  cancel,

		DB:    db,
		Redis: redisClient,

		// Repositories
		TicketRepo:       ticketRepo,
		UserRepo:         userRepo,
		RefreshTokenRepo: refreshTokenRepo,

		// Queue
		EmailQueue: redisQueue,
		FailQueue:  failQueue,

		// Storage
		LocalStorage: localStorage,

		// Services
		JWTService:    jwtService,
		TicketService: ticketService,
		AuthService:   authService,
		UploadService: uploadService,

		// Handlers
		TicketHandler: ticketHandler,
		AuthHandler:   authHandler,
		UploadHandler: uploadHandler,

		// Workers
		EmailWorker: emailWorker,

		// Router
		Router: r,
	}

	return app, nil
}

func (a *App) startWorkers() {

	go a.EmailWorker.Start(a.Context)

	// go a.SMSWorker.Start(a.Context)

	// go a.NotificationWorker.Start(a.Context)

}

// func (a *App) startServer() error {
// 	return a.Router.Run(
// 		":" + a.Config.Port,
// 	)
// }
