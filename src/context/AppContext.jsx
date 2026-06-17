import { createContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [quizStep, setQuizStep] = useState("mood");
  const [moodAnswers, setMoodAnswers] = useState([]);
  const [personalityAnswers, setPersonalityAnswers] = useState([]);
  const [currentRecommendations, setCurrentRecommendations] = useState([]);

  return (
    <AppContext.Provider
      value={{
        quizStep,
        setQuizStep,
        moodAnswers,
        setMoodAnswers,
        personalityAnswers,
        setPersonalityAnswers,
        currentRecommendations,
        setCurrentRecommendations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
