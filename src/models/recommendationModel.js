export const createRecommendation = ({
  movie,
  score = 0,
  matchReasons = [],
  warnings = [],
  emotionalFit = 0,
  personalityFit = 0,
  safetyFit = 1,
}) => ({
  movie,
  score,
  matchReasons,
  warnings,
  emotionalFit,
  personalityFit,
  safetyFit,
});

const isScore = (value) =>
  typeof value === "number" && value >= 0 && value <= 1;

export const validateRecommendation = (recommendation) => {
  if (!recommendation || typeof recommendation !== "object") return false;
  if (!recommendation.movie || typeof recommendation.movie !== "object") return false;
  if (!isScore(recommendation.score)) return false;
  if (!Array.isArray(recommendation.matchReasons)) return false;
  if (!Array.isArray(recommendation.warnings)) return false;
  if (!isScore(recommendation.emotionalFit)) return false;
  if (!isScore(recommendation.personalityFit)) return false;
  if (!isScore(recommendation.safetyFit)) return false;

  return true;
};