export default function LoadingState() {
  return (
    <div className="loading-card">
      <div className="loader" />
      <span>Loading weather data...</span>
      <small>
        Fetching current conditions and forecasts
      </small>
    </div>
  );
}
