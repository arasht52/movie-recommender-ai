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