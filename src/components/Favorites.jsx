import React, { useContext } from 'react';
import MovieCard from './MovieCard';
import { FavoritesContext } from '../context/FavoritesContext';
import { Link } from 'react-router-dom';

export default function Favorites() {

  const { favorites, isFavorited, removeFromFavorites } = useContext(FavoritesContext);

  if (favorites.length === 0) {
    return (
      <>
        <Link to="/" className="fav-link">
          ← Back
        </Link>
        <p className="empty-msg">No favorites yet. ❤️</p>
      </>
    );
  }

  return (
    <>
      <Link to="/" className="fav-link">
        ← Back
      </Link>

      <div className="grid">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorited(movie.id)}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </div>
    </>
  );
}