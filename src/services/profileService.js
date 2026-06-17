import { getItem, setItem } from "../utils/storage";

const PROFILE_KEY = "userProfile";

export const getProfile = () => {
  return getItem(PROFILE_KEY, {
    favoriteGenres: [],
    favoriteActors: [],
    favoriteDirectors: [],
    favoriteCountries: [],
    preferredLanguages: [],
    preferredDecades: [],
    favoriteCategories: [],
    mood: null
  });
};

export const saveProfile = (profile) => {
  return setItem(PROFILE_KEY, profile);
};