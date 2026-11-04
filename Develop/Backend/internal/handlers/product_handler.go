package handlers

import (
	"log/slog"

	"loghanteh-project/internal/response"
	"loghanteh-project/internal/services"

	"github.com/gin-gonic/gin"
)

type ProductHandler struct {
	productService *services.ProductService
	logger         *slog.Logger
}

func NewProductHandler(productService *services.ProductService, logger *slog.Logger) *ProductHandler {
	return &ProductHandler{productService: productService, logger: logger}
}

func (h *ProductHandler) GetDiscounted(c *gin.Context) {
	products, err := h.productService.GetDiscounted(c.Request.Context(), requestLanguage(c))
	if err != nil {
		response.HandleError(c, err, h.logger)
		return
	}
	response.Success(c, "products_fetched_successfully", products)
}

func (h *ProductHandler) GetNewest(c *gin.Context) {
	products, err := h.productService.GetNewest(c.Request.Context(), requestLanguage(c))
	if err != nil {
		response.HandleError(c, err, h.logger)
		return
	}
	response.Success(c, "products_fetched_successfully", products)
}

func (h *ProductHandler) GetOnePerMuseum(c *gin.Context) {
	products, err := h.productService.GetOnePerMuseum(c.Request.Context(), requestLanguage(c))
	if err != nil {
		response.HandleError(c, err, h.logger)
		return
	}
	response.Success(c, "products_fetched_successfully", products)
}

func (h *ProductHandler) List(c *gin.Context) {
	sortBy := c.Query("sort")
	if sortBy == "" {
		sortBy = c.Query("sortBy")
	}
	products, err := h.productService.List(
		c.Request.Context(),
		requestLanguage(c),
		c.Query("museum"),
		c.Query("category"),
		c.Query("minPrice"),
		c.Query("maxPrice"),
		c.Query("page"),
		sortBy,
	)
	if err != nil {
		response.HandleError(c, err, h.logger)
		return
	}
	response.Success(c, "products_fetched_successfully", products)
}

func (h *ProductHandler) GetDetail(c *gin.Context) {
	product, err := h.productService.GetDetail(c.Request.Context(), requestLanguage(c), c.Param("id"))
	if err != nil {
		response.HandleError(c, err, h.logger)
		return
	}
	response.Success(c, "product_fetched_successfully", product)
}

func (h *ProductHandler) GetRelated(c *gin.Context) {
	products, err := h.productService.GetRelated(c.Request.Context(), requestLanguage(c), c.Param("id"))
	if err != nil {
		response.HandleError(c, err, h.logger)
		return
	}
	response.Success(c, "products_fetched_successfully", products)
}

func requestLanguage(c *gin.Context) string {
	if language := c.Query("lang"); language != "" {
		return language
	}
	return c.GetHeader("Accept-Language")
}
