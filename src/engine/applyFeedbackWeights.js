export const applyFeedbackWeights = ({
  recommendations = [],
  feedbackHistory = [],
}) => {
  if (!feedbackHistory.length) return recommendations;

  return recommendations.map((recommendation) => {
    const movieId = recommendation.movie.id;

    const movieFeedback = feedbackHistory.filter(
      (item) => item.movieId === movieId
    );

    if (!movieFeedback.length) return recommendation;

    let scoreModifier = 0;
    const matchReasons = [...recommendation.matchReasons];

    for (const feedback of movieFeedback) {
      if (feedback.reaction === "like") scoreModifier += 0.08;
      if (feedback.reaction === "watched") scoreModifier += 0.04;
      if (feedback.reaction === "dislike") scoreModifier -= 0.12;
      if (feedback.reaction === "skipped") scoreModifier -= 0.05;
    }

    if (scoreModifier > 0) {
      matchReasons.push("بر اساس بازخورد قبلی شما تقویت شده است.");
    }

    if (scoreModifier < 0) {
      matchReasons.push("به دلیل بازخورد قبلی شما کمی پایین‌تر رتبه‌بندی شد.");
    }

    return {
      ...recommendation,
      score: Math.max(0, Math.min(1, recommendation.score + scoreModifier)),
      matchReasons,
    };
  });
};