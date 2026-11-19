package dto

type SearchSuggestion struct {
	ProductID uint   `json:"productId"`
	Title     string `json:"title"`
	Href      string `json:"href"`
}

type SearchSuggestionsResponse struct {
	Suggestions []SearchSuggestion `json:"suggestions"`
}
