import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorState({
  message,
  onRetry
}) {
  return (
    <div className="error-card">
      <AlertCircle size={28} />

      <div>
        <span>WEATHER ERROR</span>
        <h2>We couldn't load that location</h2>
        <p>{message}</p>

        <button
          type="button"
          onClick={onRetry}
        >
          <RefreshCw size={16} />
          Try again
        </button>
      </div>
    </div>
  );
}
