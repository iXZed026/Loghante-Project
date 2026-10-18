
"use client";

import { useEffect, useState } from "react";

type SearchFunction<T> = (
    query: string,
    signal: AbortSignal,
) => Promise<T[]>;

interface UseDebouncedSearchOptions<T> {
    query: string;
    search: SearchFunction<T>;
    debounceMs?: number;
    minLength?: number;
}

interface UseDebouncedSearchResult<T> {
    results: T[];
    isLoading: boolean;
    error: Error | null;
}

function useDebouncedSearch<T>({
    query,
    search,
    debounceMs = 400,
    minLength = 1,
}: UseDebouncedSearchOptions<T>): UseDebouncedSearchResult<T> {
    const [results, setResults] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const normalizedQuery = query.trim();

    useEffect(() => {
        if (normalizedQuery.length < minLength) {
            setResults([]);
            setIsLoading(false);
            setError(null);
            return;
        }

        const controller = new AbortController();

        setResults([]);
        setIsLoading(true);
        setError(null);

        const timeoutId = window.setTimeout(async () => {
            try {
                const data = await search(
                    normalizedQuery,
                    controller.signal,
                );

                if (!controller.signal.aborted) {
                    setResults(data);
                }
            } catch (cause) {
                if (!controller.signal.aborted) {
                    setResults([]);
                    setError(
                        cause instanceof Error
                            ? cause
                            : new Error("Search failed."),
                    );
                }
            } finally {
                if (!controller.signal.aborted) {
                    setIsLoading(false);
                }
            }
        }, debounceMs);

        return () => {
            window.clearTimeout(timeoutId);
            controller.abort();
        };
    }, [normalizedQuery, search, debounceMs, minLength]);

    return {
        results,
        isLoading,
        error,
    };
}

export default useDebouncedSearch;
