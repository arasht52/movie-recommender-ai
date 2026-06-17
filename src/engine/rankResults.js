export const rankResults = ({
  recommendations = [],
  recommendationHistory = [],
  limit = 3,
}) => {
  const recentlyRecommendedMovieIds = new Set(
    recommendationHistory
      .slice(-3)
      .flatMap((session) => session.results || [])
      .map((result) => result.movieId)
      .filter(Boolean)
  );

  return [...recommendations]
    .map((recommendation) => {
      const wasRecentlyRecommended = recentlyRecommendedMovieIds.has(
        recommendation.movie.id
      );

      return {
        ...recommendation,
        score: wasRecentlyRecommended
          ? Math.max(0, recommendation.score - 0.08)
          : recommendation.score,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};