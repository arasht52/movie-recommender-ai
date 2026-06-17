import { recommend } from "../engine/recommend";
import { addRecommendationSession } from "./historyService";

const createSessionId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `session_${Date.now()}_${Math.random().toString(36).slice(2)}`;
};

export const getRecommendations = ({
  movies = [],
  userPreferences = {},
  limit = 3,
}) => {
  const results = recommend({
    movies,
    userPreferences,
    limit,
  });

  addRecommendationSession({
    sessionId: createSessionId(),
    userVectorSnapshot: userPreferences,
    results,
  });

  return results;
};