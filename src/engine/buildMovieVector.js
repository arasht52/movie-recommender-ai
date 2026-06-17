export const buildMovieVector = (movie) => {
  return {
    moodTags: movie.moodTags || [],
    emotionalGoals: movie.emotionalGoals || [],
    personalityTags: movie.personalityTags || [],

    energy: movie.energy ?? 5,
    sadness: movie.sadness ?? 0,
    violence: movie.violence ?? 0,
    fear: movie.fear ?? 0,
    hope: movie.hope ?? 5,
    humor: movie.humor ?? 0,
    complexity: movie.complexity ?? 5,
    pacing: movie.pacing ?? 5,
    romance: movie.romance ?? 0,

    familyFriendly: movie.familyFriendly ?? false,
    endingType: movie.endingType || "unknown",
    watchContext: movie.watchContext || [],
    contentWarnings: movie.contentWarnings || [],
  };
};