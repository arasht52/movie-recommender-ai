import { AppProvider } from "./src/context/AppContext";
import { useRecommendation } from "./src/hooks/useRecommendation";
import ResultsPage from "./src/pages/ResultsPage";

function TestHome() {
  const { generateRecommendations } = useRecommendation();

  const handleGenerate = () => {
    generateRecommendations(
      {
        moodTags: ["hope", "comfort"],
        emotionalGoals: ["hope", "perspective"],
        personalityTags: ["dreamer", "optimist"],
        preferredTypes: ["movie", "series"],
        preferredRegions: ["hollywood", "international"],
        preferredLanguages: ["English", "Korean"],
      },
      5
    );
  };

  return (
    <main style={{ padding: 24 }}>
      <h1>MoodMovie AI</h1>
      <p>نسخه تست اولیه موتور پیشنهاد فیلم</p>

      <button onClick={handleGenerate}>
        پیشنهاد بده
      </button>

      <ResultsPage />
    </main>
  );
}

export default function App() {
  return (
    <AppProvider>
      <TestHome />
    </AppProvider>
  );
}