import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import movies from "../data/movies.json";
import { getRecommendations } from "../services/recommendationService";

export function useRecommendation() {
  const { currentRecommendations, setCurrentRecommendations } =
    useContext(AppContext);

  const generateRecommendations = (userPreferences, limit = 5) => {
    const results = getRecommendations({
      movies,
      userPreferences,
      limit,
    });

    setCurrentRecommendations(results);

    return results;
  };

  return {
    currentRecommendations,
    generateRecommendations,
  };
}