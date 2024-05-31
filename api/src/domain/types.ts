export interface SearchResult {
    title: string;
    url: string;
}

export interface SearchResultWithContent extends SearchResult {
    content: string;
}
