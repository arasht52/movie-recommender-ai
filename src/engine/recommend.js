import { SCORING_WEIGHTS } from "../constants/scoringWeights";
import { getSettings } from "../services/settingsService";
import { getFeedbackHistory } from "../services/feedbackService";
import { getRecommendationHistory } from "../services/historyService";

import { scoreMovies } from "./scoreMovies";
import { applySafetyFilters } from "./applySafetyFilters";
import { applyFeedbackWeights } from "./applyFeedbackWeights";
import { rankResults } from "./rankResults";

export const recommend = ({
  movies = [],
  userPreferences = {},
  limit = 3,
}) => {
  const settings = getSettings();
  const feedbackHistory = getFeedbackHistory();
  const recommendationHistory = getRecommendationHistory();

  const weights = {
    ...SCORING_WEIGHTS,
    ...(settings.weightOverrides || {}),
  };

  const scored = scoreMovies({
    movies,
    userPreferences: {
      ...userPreferences,
      preferredTypes:
        userPreferences.preferredTypes || settings.preferredTypes || [],
      preferredRegions:
        userPreferences.preferredRegions || settings.preferredRegions || [],
      preferredLanguages:
        userPreferences.preferredLanguages ||
        settings.preferredLanguages ||
        [],
    },
    weights,
  });

  const safetyFiltered = applySafetyFilters({
    recommendations: scored,
    settings,
  });

  const feedbackWeighted = applyFeedbackWeights({
    recommendations: safetyFiltered,
    feedbackHistory,
  });

  return rankResults({
    recommendations: feedbackWeighted,
    recommendationHistory,
    limit,
  });
};