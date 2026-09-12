package app

import (
	"context"
	"log/slog"
	"museum_ticket/internal/auth"
	"museum_ticket/internal/config"
	"museum_ticket/internal/handlers"
	"museum_ticket/internal/queue"
	"museum_ticket/internal/repositories"
	"museum_ticket/internal/services"
	"museum_ticket/internal/storage"
	"museum_ticket/internal/upload"
	"museum_ticket/internal/worker"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/redis/go-redis/v9"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type App struct {
	Config config.Config
	Logger *slog.Logger

	Context context.Context

	Cancel context.CancelFunc

	DB    *mongo.Database
	Redis *redis.Client

	//Repositories
	TicketRepo       *repositories.MongoTicketRepository
	UserRepo         *repositories.MongoUserRepository
	RefreshTokenRepo *repositories.MongoRefreshTokenRepository

	//Queue
	EmailQueue   *queue.RedisQueue
	FailQueue    *queue.FailQueue
	LocalStorage storage.Storage

	//Services
	JWTService    *auth.JWTService
	TicketService *services.TicketService
	AuthService   *services.AuthService
	UploadService *upload.Service

	//Handlers
	TicketHandler *handlers.TicketHandler
	AuthHandler   *handlers.AuthHandler
	UploadHandler *handlers.UploadHandler

	//workers
	EmailWorker *worker.EmailWorker
	// SMSWorker *worker.SMSWorker

	Router *gin.Engine
	Server *http.Server
}
