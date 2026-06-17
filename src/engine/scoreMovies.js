import { createRecommendation } from "../models/recommendationModel";

const overlapScore = (userItems = [], movieItems = []) => {
  if (!userItems.length || !movieItems.length) return 0;

  const matches = userItems.filter((item) => movieItems.includes(item));
  return matches.length / userItems.length;
};

const normalize10 = (value) => {
  if (typeof value !== "number") return 0;
  return Math.max(0, Math.min(10, value)) / 10;
};

export const scoreMovies = ({
  movies = [],
  userPreferences = {},
  weights = {},
}) => {
  const {
    moodTags = [],
    emotionalGoals = [],
    personalityTags = [],
    preferredTypes = [],
    preferredRegions = [],
    preferredLanguages = [],
  } = userPreferences;

  return movies.map((movie) => {
    const moodFit = overlapScore(moodTags, movie.moodTags || []);
    const goalFit = overlapScore(emotionalGoals, movie.emotionalGoals || []);
    const personalityFit = overlapScore(
      personalityTags,
      movie.personalityTags || []
    );

    const typeFit =
      preferredTypes.length === 0 || preferredTypes.includes(movie.type) ? 1 : 0;

    const regionFit =
      preferredRegions.length === 0 || preferredRegions.includes(movie.region)
        ? 1
        : 0;

    const languageFit =
      preferredLanguages.length === 0 ||
      preferredLanguages.includes(movie.language)
        ? 1
        : 0;

    const hopeFit = normalize10(movie.hope);
    const comfortFit = 1 - normalize10(movie.fear);

    const emotionalFit = Math.min(
      1,
      moodFit * 0.35 + goalFit * 0.35 + hopeFit * 0.15 + comfortFit * 0.15
    );

    const baseScore =
      emotionalFit * (weights.emotion ?? 0.45) +
      personalityFit * (weights.personality ?? 0.25) +
      typeFit * 0.1 +
      regionFit * 0.1 +
      languageFit * 0.1;

    const matchReasons = [];

    if (moodFit > 0) matchReasons.push("با حال فعلی شما هماهنگ است.");
    if (goalFit > 0) matchReasons.push("با هدف احساسی شما جور است.");
    if (personalityFit > 0) {
      matchReasons.push("با الگوی شخصیتی سینمایی شما هم‌خوانی دارد.");
    }
    if (regionFit === 1 && preferredRegions.length > 0) {
      matchReasons.push("در محدوده محتوایی مورد علاقه شما قرار دارد.");
    }

    return createRecommendation({
      movie,
      score: Math.min(1, baseScore),
      matchReasons,
      warnings: [],
      emotionalFit,
      personalityFit,
      safetyFit: 1,
    });
  });
};