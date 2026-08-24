package app

import (
	"context"
	"fmt"
	"log"
	"log/slog"
	"loghanteh-project/internal/config"
	"loghanteh-project/internal/database"
	"loghanteh-project/internal/routes"

	// "test-postgres/internal/database"
	// "test-postgres/internal/handlers"
	// "test-postgres/internal/repositories"
	// "test-postgres/internal/routes"
	// "test-postgres/internal/services"

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
	// userRepo := repositories.NewUserRepository(db)

	//////////////
	//Services
	//////////////
	// userService :=
	// services.NewUserService(userRepo)

	//////////////
	//Services
	//////////////
	// userHandler :=
	// 	handlers.NewUserHandler(userService)

	r := gin.Default()

	routes.SetupRoutes(
		r,
		logger,
	)

	return &App{
		Config:  cfg,
		Logger:  logger,
		Context: ctx,
		Cancel:  cancel,

		Router: r,
	}, nil
}
