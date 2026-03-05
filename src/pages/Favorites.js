import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  console.log('Favorites in context:', favorites); // Debug log

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>
      {favorites && favorites.length === 0 ? (
        <p>No favorites yet!</p>
      ) : (
        <div className="movies-grid">
          {favorites && favorites.map(movie => (
            <div key={movie.id} className="movie-card">
              <img src={movie.poster} alt={movie.title} />
              <h3>{movie.title}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;