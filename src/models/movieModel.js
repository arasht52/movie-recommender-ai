import { CONTENT_REGIONS } from "../constants/contentRegions";

export const CONTENT_TYPES = {
  MOVIE: "movie",
  SERIES: "series",
};

export const createMovie = ({
  id,
  title,
  type,
  region,
  country,
  language,
  year,
  genres = [],
  moodTags = [],
  emotionalGoals = [],
  personalityTags = [],
  energy = 5,
  sadness = 0,
  violence = 0,
  fear = 0,
  hope = 5,
  humor = 0,
  complexity = 5,
  pacing = 5,
  romance = 0,
  familyFriendly = false,
  endingType = "unknown",
  watchContext = [],
  contentWarnings = [],
  posterUrl = null,
  runtimeMinutes = null,
  reason = "",
}) => ({
  id,
  title,
  type,
  region,
  country,
  language,
  year,
  genres,
  moodTags,
  emotionalGoals,
  personalityTags,
  energy,
  sadness,
  violence,
  fear,
  hope,
  humor,
  complexity,
  pacing,
  romance,
  familyFriendly,
  endingType,
  watchContext,
  contentWarnings,
  posterUrl,
  runtimeMinutes,
  reason,
});

const isNumberInRange = (value, min = 0, max = 10) =>
  typeof value === "number" && value >= min && value <= max;

export const validateMovie = (movie) => {
  if (!movie || typeof movie !== "object") return false;

  const validTypes = Object.values(CONTENT_TYPES);
  const validRegions = Object.values(CONTENT_REGIONS);

  if (!movie.id || typeof movie.id !== "string") return false;
  if (!movie.title || typeof movie.title !== "string") return false;
  if (!validTypes.includes(movie.type)) return false;
  if (!validRegions.includes(movie.region)) return false;
  if (!movie.country || typeof movie.country !== "string") return false;
  if (!movie.language || typeof movie.language !== "string") return false;
  if (typeof movie.year !== "number") return false;

  const arrayFields = [
    "genres",
    "moodTags",
    "emotionalGoals",
    "personalityTags",
    "watchContext",
    "contentWarnings",
  ];

  for (const field of arrayFields) {
    if (!Array.isArray(movie[field])) return false;
  }

  const numericFields = [
    "energy",
    "sadness",
    "violence",
    "fear",
    "hope",
    "humor",
    "complexity",
    "pacing",
    "romance",
  ];

  for (const field of numericFields) {
    if (!isNumberInRange(movie[field])) return false;
  }

  if (typeof movie.familyFriendly !== "boolean") return false;
  if (typeof movie.endingType !== "string") return false;
  if (typeof movie.reason !== "string") return false;

  if (
    movie.posterUrl !== null &&
    typeof movie.posterUrl !== "string"
  ) {
    return false;
  }

  if (
    movie.runtimeMinutes !== null &&
    typeof movie.runtimeMinutes !== "number"
  ) {
    return false;
  }

  return true;
};

export const normalizeMovie = (movie) =>
  createMovie({
    ...movie,
    genres: movie.genres || [],
    moodTags: movie.moodTags || [],
    emotionalGoals: movie.emotionalGoals || [],
    personalityTags: movie.personalityTags || [],
    watchContext: movie.watchContext || [],
    contentWarnings: movie.contentWarnings || [],
    posterUrl: movie.posterUrl ?? null,
    runtimeMinutes: movie.runtimeMinutes ?? null,
    reason: movie.reason || "",
  });