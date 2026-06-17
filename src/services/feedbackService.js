import { getItem, setItem } from "../utils/storage";
import { STORAGE_KEYS } from "../constants/storageKeys";

export const FEEDBACK_REACTIONS = {
  LIKE: "like",
  DISLIKE: "dislike",
  WATCHED: "watched",
  SKIPPED: "skipped",
};

export const getFeedbackHistory = () => {
  return getItem(STORAGE_KEYS.FEEDBACK_HISTORY, []);
};

export const getFeedbackForMovie = (movieId) => {
  const history = getFeedbackHistory();
  return history.filter((item) => item.movieId === movieId);
};

export const recordFeedback = (movieId, reaction) => {
  const allowedReactions = Object.values(FEEDBACK_REACTIONS);

  if (!allowedReactions.includes(reaction)) {
    throw new Error(`Invalid feedback reaction: ${reaction}`);
  }

  const history = getFeedbackHistory();

  const nextHistory = [
    ...history,
    {
      movieId,
      reaction,
      date: new Date().toISOString(),
    },
  ];

  setItem(STORAGE_KEYS.FEEDBACK_HISTORY, nextHistory);
  return nextHistory;
};

export const clearFeedbackHistory = () => {
  setItem(STORAGE_KEYS.FEEDBACK_HISTORY, []);
  return [];
};