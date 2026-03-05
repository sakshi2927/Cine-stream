import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const FavoriteButton = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorited } = useContext(FavoritesContext);
  const favorited = isFavorited(movie.id);

  const handleClick = () => {
    console.log('Movie object:', movie); // Debug: Check if movie data exists
    console.log('Movie ID:', movie.id);
    
    if (favorited) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
      console.log('Added to favorites'); // Debug
    }
  };

  return (
    <button onClick={handleClick} className={`favorite-btn ${favorited ? 'active' : ''}`}>
      {favorited ? '❤️' : '🤍'} {favorited ? 'Remove' : 'Add to Favorites'}
    </button>
  );
};

export default FavoriteButton;