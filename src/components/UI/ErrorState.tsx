import React from 'react';
import { AlertCircle, RotateCw } from 'lucide-react';
import './ErrorState.css';

interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Weather information is currently unavailable.',
  onRetry,
}) => {
  return (
    <div className="error-state-container" role="alert">
      <div className="glass-card error-state-card">
        <div className="error-state-icon" aria-hidden="true">
          <AlertCircle size={30} />
        </div>
        <h2 className="error-state-title">Unable to Load Weather</h2>
        <p className="error-state-desc">{message}</p>
        <button className="error-retry-btn" onClick={onRetry} aria-label="Retry loading weather">
          <RotateCw size={16} />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  );
};
