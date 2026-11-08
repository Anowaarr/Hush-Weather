import React from 'react';
import {
  Sun,
  Sunset,
  Sunrise,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Gauge,
  Umbrella,
} from 'lucide-react';
import { WeatherData } from '../../types/weather';
import { UnitsConfig } from '../../types/units';
import {
  formatTemperature,
  formatSpeed,
  formatPressure,
  formatVisibility,
  formatPrecipitation,
  degreesToCompass,
  getUVIndexCategory,
  calculateDewPoint,
} from '../../utils/units';
import { formatSunTime, calculateSunPosition } from '../../utils/date';
import './Details.css';

interface DetailTilesProps {
  weather: WeatherData;
  units: UnitsConfig;
}

export const DetailTiles: React.FC<DetailTilesProps> = ({ weather, units }) => {
  const { current, daily, hourly } = weather;
  const today = daily[0];

  // 1. UV Index
  const currentUv = hourly[0]?.uvIndex ?? today?.uvIndexMax ?? 0;
  const uvCategory = getUVIndexCategory(currentUv);
  const uvPercent = Math.min(100, Math.max(0, (currentUv / 11) * 100));

  // 2. Sunrise / Sunset
  const sunriseIso = today?.sunrise ?? '';
  const sunsetIso = today?.sunset ?? '';
  const sunPos = calculateSunPosition(current.time, sunriseIso, sunsetIso);
  const isAfterSunset = !sunPos.isDaylight && sunPos.progress >= 1;
  const nextSunLabel = isAfterSunset ? 'Sunrise' : 'Sunset';
  const nextSunTime = isAfterSunset
    ? formatSunTime(daily[1]?.sunrise ?? sunriseIso)
    : formatSunTime(sunsetIso);

  // Quadratic Bezier arc calculation (P0=(10,38), P1=(50,6), P2=(90,38))
  const t = sunPos.progress;
  const sunArcX = (1 - t) * (1 - t) * 10 + 2 * (1 - t) * t * 50 + t * t * 90;
  const sunArcY = (1 - t) * (1 - t) * 38 + 2 * (1 - t) * t * 6 + t * t * 38;

  // 3. Wind
  const windDirLabel = degreesToCompass(current.windDirection);
  const windGustFormatted = formatSpeed(current.windGusts, units.speed);

  // 4. Feels Like
  const diffTemp = current.apparentTemperature - current.temperature;
  let feelsLikeNote = 'Similar to the actual temperature.';
  if (diffTemp >= 1.5) {
    feelsLikeNote = 'Humidity is making it feel warmer.';
  } else if (diffTemp <= -1.5) {
    feelsLikeNote = 'Wind is making it feel cooler.';
  }

  // 5. Humidity & Dew Point
  const dewPoint = calculateDewPoint(current.temperature, current.relativeHumidity);

  // 6. Visibility
  const visibilityMeters = hourly[0]?.visibility ?? 10000;
  let visibilityNote = "It's perfectly clear.";
  if (visibilityMeters < 3000) {
    visibilityNote = 'Dense fog or heavy rain reducing visibility.';
  } else if (visibilityMeters < 8000) {
    visibilityNote = 'Light haze affecting distant visibility.';
  }

  // 7. Pressure
  const pressureNote =
    current.surfacePressure >= 1018
      ? 'High pressure system dominant.'
      : current.surfacePressure <= 1005
        ? 'Low pressure system, possible storm.'
        : 'Steady atmospheric pressure.';

  // 8. Precipitation
  const precipTotal = today?.precipitationSum ?? current.precipitation ?? 0;
  const precipNote =
    precipTotal > 0
      ? `Expected today: ${formatPrecipitation(precipTotal, units.precipitation)}`
      : 'No precipitation expected in the next 24 hours.';

  return (
    <div className="detail-grid" role="region" aria-label="Detailed weather metrics">
      {/* 1. UV Index */}
      <div className="glass-card detail-tile" aria-label={`UV Index: ${Math.round(currentUv)}, ${uvCategory.label}`}>
        <div className="card-header">
          <Sun size={14} aria-hidden="true" />
          <span>UV Index</span>
        </div>
        <div className="detail-tile-content">
          <div className="detail-big-value">{Math.round(currentUv)}</div>
          <div className="detail-sub-value" style={{ color: uvCategory.color }}>
            {uvCategory.label}
          </div>
          <div className="uv-bar-container">
            <div className="uv-bar-gradient" />
            <div className="uv-indicator-dot" style={{ left: `${uvPercent}%` }} />
          </div>
        </div>
        <div className="detail-explaining-text">{uvCategory.description}</div>
      </div>

      {/* 2. Sunset / Sunrise */}
      <div className="glass-card detail-tile" aria-label={`${nextSunLabel}: ${nextSunTime}`}>
        <div className="card-header">
          {isAfterSunset ? <Sunrise size={14} aria-hidden="true" /> : <Sunset size={14} aria-hidden="true" />}
          <span>{nextSunLabel}</span>
        </div>
        <div className="detail-tile-content">
          <div className="detail-big-value">{nextSunTime}</div>
          <svg className="sun-arc-svg" viewBox="0 0 100 44" aria-hidden="true">
            {/* Horizon baseline */}
            <line x1="6" y1="38" x2="94" y2="38" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 3" />
            {/* Trajectory arc */}
            <path d="M 10 38 Q 50 6 90 38" fill="none" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
            {/* Sun position marker */}
            <circle cx={sunArcX} cy={sunArcY} r="4" fill="#ffd54f" stroke="currentColor" strokeWidth="1.5" filter="drop-shadow(0 0 3px #ffb300)" />
          </svg>
        </div>
        <div className="detail-explaining-text">
          {isAfterSunset ? `Sunset was at ${formatSunTime(sunsetIso)}` : `Sunrise was at ${formatSunTime(sunriseIso)}`}
        </div>
      </div>

      {/* 3. Wind */}
      <div className="glass-card detail-tile" aria-label={`Wind: ${formatSpeed(current.windSpeed, units.speed)} from ${windDirLabel}`}>
        <div className="card-header">
          <Wind size={14} aria-hidden="true" />
          <span>Wind</span>
        </div>
        <div className="detail-tile-content">
          <div className="wind-tile-body">
            <div>
              <div className="detail-big-value">{formatSpeed(current.windSpeed, units.speed)}</div>
              <div className="detail-sub-value">{windDirLabel}</div>
            </div>
            <div className="wind-compass-dial" aria-hidden="true">
              <span className="compass-cardinal compass-n">N</span>
              <span className="compass-cardinal compass-e">E</span>
              <span className="compass-cardinal compass-s">S</span>
              <span className="compass-cardinal compass-w">W</span>
              <div
                className="compass-needle"
                style={{ transform: `rotate(${current.windDirection}deg)` }}
              />
              <div className="compass-center-dot" />
            </div>
          </div>
        </div>
        <div className="detail-explaining-text">Gusts up to {windGustFormatted}</div>
      </div>

      {/* 4. Feels Like */}
      <div className="glass-card detail-tile" aria-label={`Feels like: ${formatTemperature(current.apparentTemperature, units.temperature)}`}>
        <div className="card-header">
          <Thermometer size={14} aria-hidden="true" />
          <span>Feels Like</span>
        </div>
        <div className="detail-tile-content">
          <div className="detail-big-value">
            {formatTemperature(current.apparentTemperature, units.temperature)}
          </div>
        </div>
        <div className="detail-explaining-text">{feelsLikeNote}</div>
      </div>

      {/* 5. Humidity */}
      <div className="glass-card detail-tile" aria-label={`Humidity: ${current.relativeHumidity} percent`}>
        <div className="card-header">
          <Droplets size={14} aria-hidden="true" />
          <span>Humidity</span>
        </div>
        <div className="detail-tile-content">
          <div className="detail-big-value">{current.relativeHumidity}%</div>
        </div>
        <div className="detail-explaining-text">
          The dew point is {formatTemperature(dewPoint, units.temperature)} right now.
        </div>
      </div>

      {/* 6. Visibility */}
      <div className="glass-card detail-tile" aria-label={`Visibility: ${formatVisibility(visibilityMeters, units.distance)}`}>
        <div className="card-header">
          <Eye size={14} aria-hidden="true" />
          <span>Visibility</span>
        </div>
        <div className="detail-tile-content">
          <div className="detail-big-value">
            {formatVisibility(visibilityMeters, units.distance)}
          </div>
        </div>
        <div className="detail-explaining-text">{visibilityNote}</div>
      </div>

      {/* 7. Pressure */}
      <div className="glass-card detail-tile" aria-label={`Pressure: ${formatPressure(current.surfacePressure, units.pressure)}`}>
        <div className="card-header">
          <Gauge size={14} aria-hidden="true" />
          <span>Pressure</span>
        </div>
        <div className="detail-tile-content">
          <div className="detail-big-value">
            {formatPressure(current.surfacePressure, units.pressure)}
          </div>
        </div>
        <div className="detail-explaining-text">{pressureNote}</div>
      </div>

      {/* 8. Precipitation */}
      <div className="glass-card detail-tile" aria-label={`Precipitation: ${formatPrecipitation(precipTotal, units.precipitation)}`}>
        <div className="card-header">
          <Umbrella size={14} aria-hidden="true" />
          <span>Precipitation</span>
        </div>
        <div className="detail-tile-content">
          <div className="detail-big-value">
            {formatPrecipitation(precipTotal, units.precipitation)}
          </div>
          <div className="detail-sub-value">in 24h</div>
        </div>
        <div className="detail-explaining-text">{precipNote}</div>
      </div>
    </div>
  );
};
