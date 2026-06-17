import { getItem, setItem } from "../utils/storage";
import { STORAGE_KEYS } from "../constants/storageKeys";

export const getFavorites = () => {
  return getItem(STORAGE_KEYS.FAVORITES, []);
};

export const isFavorite = (movieId) => {
  const favorites = getFavorites();
  return favorites.some((item) => item.movieId === movieId);
};

export const addFavorite = (movie) => {
  const favorites = getFavorites();

  if (isFavorite(movie.id)) {
    return favorites;
  }

  const nextFavorites = [
    ...favorites,
    {
      movieId: movie.id,
      title: movie.title,
      savedAt: new Date().toISOString(),
    },
  ];

  setItem(STORAGE_KEYS.FAVORITES, nextFavorites);
  return nextFavorites;
};

export const removeFavorite = (movieId) => {
  const favorites = getFavorites();
  const nextFavorites = favorites.filter((item) => item.movieId !== movieId);

  setItem(STORAGE_KEYS.FAVORITES, nextFavorites);
  return nextFavorites;
};

export const toggleFavorite = (movie) => {
  if (isFavorite(movie.id)) {
    return removeFavorite(movie.id);
  }

  return addFavorite(movie);
};