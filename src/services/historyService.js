// import { getItem, setItem } from "../utils/storage";
import { STORAGE_KEYS } from "../constants/storageKeys";

export const getRecommendationHistory = () => {
  return getItem(STORAGE_KEYS.RECOMMENDATION_HISTORY, []);
};

export const addRecommendationSession = ({
  sessionId,
  userVectorSnapshot,
  results = [],
}) => {
  const history = getRecommendationHistory();

  const nextHistory = [
    ...history,
    {
      sessionId,
      date: new Date().toISOString(),
      userVectorSnapshot,
      results: results.map((item) => ({
        movieId: item.movie?.id,
        score: item.score,
        matchReasons: item.matchReasons || [],
        warnings: item.warnings || [],
      })),
    },
  ];

  setItem(STORAGE_KEYS.RECOMMENDATION_HISTORY, nextHistory);
  return nextHistory;
};

export const clearRecommendationHistory = () => {
  setItem(STORAGE_KEYS.RECOMMENDATION_HISTORY, []);
  return [];
};

export const getQuizState = () => {
  return getItem(STORAGE_KEYS.QUIZ_STATE, {
    step: "mood",
    moodAnswers: [],
    personalityAnswers: [],
  });
};

export const saveQuizState = (quizState) => {
  return setItem(STORAGE_KEYS.QUIZ_STATE, quizState);
};

export const clearQuizState = () => {
  const emptyState = {
    step: "mood",
    moodAnswers: [],
    personalityAnswers: [],
  };

  setItem(STORAGE_KEYS.QUIZ_STATE, emptyState);
  return emptyState;
};