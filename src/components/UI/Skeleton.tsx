import React from 'react';
import './Skeleton.css';

export const WeatherSkeleton: React.FC = () => {
  return (
    <div className="weather-content" aria-busy="true" aria-label="Loading weather data">
      {/* Hero skeleton */}
      <div className="skeleton-hero">
        <div className="skeleton-shimmer skeleton-city" />
        <div className="skeleton-shimmer skeleton-temp" />
        <div className="skeleton-shimmer skeleton-cond" />
        <div className="skeleton-shimmer skeleton-hl" />
      </div>

      {/* Hourly Card Skeleton */}
      <div className="glass-card skeleton-hourly">
        <div className="skeleton-shimmer" style={{ width: '130px', height: '14px', marginBottom: '16px' }} />
        <div style={{ display: 'flex', gap: '16px' }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div className="skeleton-shimmer" style={{ width: '32px', height: '12px' }} />
              <div className="skeleton-shimmer" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
              <div className="skeleton-shimmer" style={{ width: '28px', height: '14px' }} />
            </div>
          ))}
        </div>
      </div>

      {/* 10-day Card Skeleton */}
      <div className="glass-card skeleton-daily">
        <div className="skeleton-shimmer" style={{ width: '140px', height: '14px', marginBottom: '18px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} className="skeleton-shimmer" style={{ width: '100%', height: '24px' }} />
          ))}
        </div>
      </div>

      {/* Detail Grid Skeleton */}
      <div className="detail-grid">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="glass-card skeleton-detail-tile">
            <div className="skeleton-shimmer" style={{ width: '70px', height: '12px', marginBottom: '14px' }} />
            <div className="skeleton-shimmer" style={{ width: '60px', height: '28px', marginBottom: '10px' }} />
            <div className="skeleton-shimmer" style={{ width: '90%', height: '12px', marginTop: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
};
