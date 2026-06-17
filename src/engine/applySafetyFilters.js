const addWarning = (warnings, condition, message) => {
  if (condition) warnings.push(message);
};

export const applySafetyFilters = ({
  recommendations = [],
  settings = {},
}) => {
  const safetyFilters = settings.safetyFilters || {};

  return recommendations.map((recommendation) => {
    const movie = recommendation.movie;
    const warnings = [...(recommendation.warnings || [])];

    let safetyFit = 1;

    const highViolence = movie.violence >= 7;
    const highFear = movie.fear >= 7;
    const heavySadness = movie.sadness >= 7;
    const triggeringThemes =
      Array.isArray(movie.contentWarnings) &&
      movie.contentWarnings.length > 0;

    if (safetyFilters.avoidViolence && highViolence) {
      safetyFit -= 0.35;
    }

    if (safetyFilters.avoidFear && highFear) {
      safetyFit -= 0.35;
    }

    if (safetyFilters.avoidHeavySadness && heavySadness) {
      safetyFit -= 0.3;
    }

    if (safetyFilters.avoidTriggeringThemes && triggeringThemes) {
      safetyFit -= 0.25;
    }

    addWarning(
      warnings,
      highViolence,
      "این عنوان خشونت نسبتاً بالایی دارد."
    );

    addWarning(
      warnings,
      highFear,
      "این عنوان ممکن است اضطراب یا ترس ایجاد کند."
    );

    addWarning(
      warnings,
      heavySadness,
      "این عنوان از نظر احساسی سنگین است."
    );

    addWarning(
      warnings,
      triggeringThemes,
      "این عنوان دارای هشدار محتوایی است."
    );

    const finalSafetyFit = Math.max(0, Math.min(1, safetyFit));

    return {
      ...recommendation,
      safetyFit: finalSafetyFit,
      score: Math.max(0, recommendation.score * finalSafetyFit),
      warnings,
    };
  });
};