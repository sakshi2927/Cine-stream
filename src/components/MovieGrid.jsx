import React, { useRef, useEffect, useCallback } from 'react';
import MovieCard from './MovieCard';
import useFavorites from '../hooks/useFavorites';

export default function MovieGrid({ movies, loadMore, hasMore, loading }) {
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  if (!loading && movies.length === 0) {
    return <p className="empty-msg">No movies found.</p>;
  }

  return (
    <div className="grid">
      {movies.map((movie, idx) => {
        if (idx === movies.length - 1) {
          return (
            <div ref={lastElementRef} key={movie.id}>
              <MovieCard
                movie={movie}
                isFavorite={isFavorite(movie)}
                toggleFavorite={toggleFavorite}
              />
            </div>
          );
        }
        return (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie)}
            toggleFavorite={toggleFavorite}
          />
        );
      })}
      {loading && <p>Loading...</p>}
    </div>
  );
}
