import { useState, useEffect, useCallback } from 'react';
import { fetchPopularMovies, searchMovies } from '../api/tmdb';

export default function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const load = useCallback(
    async (pageToLoad = 1) => {
      setLoading(true);
      setError(null);
      try {
        const data = query
          ? await searchMovies(query, pageToLoad)
          : await fetchPopularMovies(pageToLoad);
        if (pageToLoad === 1) {
          setMovies(data.results);
        } else {
          setMovies((prev) => [...prev, ...data.results]);
        }
        setHasMore(pageToLoad < data.total_pages);
      } catch (e) {
        console.error(e);
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [query]
  );

  // reset when query changes
  useEffect(() => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
    load(1);
  }, [query, load]);

  const loadMore = () => {
    if (loading || !hasMore) return;
    const next = page + 1;
    setPage(next);
    load(next);
  };

  return { movies, loading, error, hasMore, loadMore };
}
