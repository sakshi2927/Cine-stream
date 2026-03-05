import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorited } = useContext(FavoritesContext);
  const favorited = isFavorited(movie.id);

  const handleFavoriteClick = () => {
    if (favorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        loading="lazy"
      />

      <h3>{movie.title}</h3>

      <button
        onClick={handleFavoriteClick}
        className={`favorite-btn ${favorited ? 'active' : ''}`}
      >
        {favorited ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default MovieCard;