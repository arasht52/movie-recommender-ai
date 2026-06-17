import { useRecommendation } from "../hooks/useRecommendation";

export default function ResultsPage() {
  const { currentRecommendations } = useRecommendation();

  return (
    <div>
      <h1>پیشنهادها</h1>

      {currentRecommendations.map((item) => (
        <div key={item.movie.id}>
          <h2>{item.movie.title}</h2>

          <p>
            امتیاز:
            {(item.score * 100).toFixed(0)}%
          </p>

          <ul>
            {item.matchReasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}