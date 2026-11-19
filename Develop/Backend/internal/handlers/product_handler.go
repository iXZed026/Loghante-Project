package handlers

import (
	"log/slog"
	"strconv"

	"loghanteh-project/internal/dto"
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
		c.Query("search"),
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

func (h *ProductHandler) SearchSuggestions(c *gin.Context) {
	query := c.Query("q")
	if query == "" {
		response.Success(c, "search_suggestions_fetched_successfully", dto.SearchSuggestionsResponse{Suggestions: []dto.SearchSuggestion{}})
		return
	}

	limit := 5
	if limitStr := c.Query("limit"); limitStr != "" {
		if parsed, err := strconv.Atoi(limitStr); err == nil && parsed > 0 && parsed <= 20 {
			limit = parsed
		}
	}

	suggestions, err := h.productService.SearchSuggestions(c.Request.Context(), requestLanguage(c), query, limit)
	if err != nil {
		response.HandleError(c, err, h.logger)
		return
	}
	response.Success(c, "search_suggestions_fetched_successfully", dto.SearchSuggestionsResponse{Suggestions: suggestions})
}

func requestLanguage(c *gin.Context) string {
	if language := c.Query("lang"); language != "" {
		return language
	}
	return c.GetHeader("Accept-Language")
}
