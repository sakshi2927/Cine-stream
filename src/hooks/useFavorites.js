import { useState, useEffect } from 'react';

const STORAGE_KEY = 'favorites';

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      setFavorites(saved);
    } catch (e) {
      console.error('Failed to read favorites from localStorage', e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  function isFavorite(movie) {
    return favorites.some((m) => m.id === movie.id);
  }

  function toggleFavorite(movie) {
    setFavorites((prev) => {
      if (prev.some((m) => m.id === movie.id)) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  }

  return { favorites, isFavorite, toggleFavorite };
}
