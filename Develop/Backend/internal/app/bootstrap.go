package app

import (
	"context"
	"fmt"
	"log"
	"log/slog"
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
			"Failed to Load env: ",
			"err,", err,
		)
	}

	ctx, cancel := context.WithCancel(
		context.Background(),
	)

	db, err := database.Connect(cfg.DatabaseURL)
	if err != nil {
		log.Fatal("failed to connect database:", err)
	}

	fmt.Println("PostgreSQL connected successfully!")

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatal("failed to get sql database:", err)
	}

	if err := sqlDB.Ping(); err != nil {
		log.Fatal("database ping failed:", err)
	}

	fmt.Println("Database ping successful!")

	//////////////
	//Repositories
	//////////////

	userRepo :=
		repositories.NewUserRepository(db)

	//////////////
	//Services
	//////////////
	authService :=
		services.NewAuthService(userRepo)

	//////////////
	//Handlers
	//////////////
	authHandler :=
		handlers.NewAuthHandler(
			authService,
			logger,
		)

	r := gin.Default()

	routes.SetupRoutes(
		r,
		logger,
		authHandler,
	)

	return &App{
		Config:  cfg,
		Logger:  logger,
		Context: ctx,
		Cancel:  cancel,

		Router: r,
	}, nil
}
