import React from 'react';
import { Clock } from 'lucide-react';
import { HourlyForecastItem } from '../../types/weather';
import { TemperatureUnit } from '../../types/units';
import { formatHourLabel, formatSunTime } from '../../utils/date';
import { formatTemperature } from '../../utils/units';
import { getWeatherCodeInfo } from '../../constants/weatherCodes';
import { WeatherIcon } from '../UI/WeatherIcon';
import './Hourly.css';

interface HourlyForecastProps {
  items: HourlyForecastItem[];
  unit: TemperatureUnit;
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ items, unit }) => {
  return (
    <section className="glass-card hourly-card" aria-label="Hourly forecast">
      <div className="card-header">
        <Clock size={14} aria-hidden="true" />
        <span>Hourly Forecast</span>
      </div>

      <div className="hourly-strip" role="region" aria-label="Next 24 hours scrolling forecast" tabIndex={0}>
        {items.map((item, index) => {
          const isNow = index === 0 && !item.isSunrise && !item.isSunset;

          if (item.isSunrise || item.isSunset) {
            const isSunrise = Boolean(item.isSunrise);
            return (
              <div
                key={`sun-${item.time}`}
                className={`hourly-item ${isSunrise ? 'hourly-sun-event' : 'hourly-sun-event sunset'}`}
                aria-label={`${isSunrise ? 'Sunrise' : 'Sunset'} at ${formatSunTime(item.time)}`}
              >
                <span className="hourly-time">{formatSunTime(item.time)}</span>
                <div className="hourly-icon-container">
                  <WeatherIcon
                    name={isSunrise ? 'sunrise' : 'sunset'}
                    size={22}
                    ariaLabel={isSunrise ? 'Sunrise' : 'Sunset'}
                  />
                </div>
                <span className="hourly-sun-label">{isSunrise ? 'Sunrise' : 'Sunset'}</span>
              </div>
            );
          }

          const codeInfo = getWeatherCodeInfo(item.weatherCode, item.isDay);
          const showPrecip = item.precipitationProbability >= 20;

          return (
            <div
              key={item.time}
              className="hourly-item"
              aria-label={`${formatHourLabel(item.time, isNow)}: ${codeInfo.label}, ${formatTemperature(item.temperature, unit)}${showPrecip ? `, ${item.precipitationProbability}% chance of precipitation` : ''}`}
            >
              <span className="hourly-time">{formatHourLabel(item.time, isNow)}</span>
              <div className="hourly-icon-container">
                <WeatherIcon name={codeInfo.iconName} size={22} ariaLabel={codeInfo.label} />
                {showPrecip && (
                  <span className="hourly-precip">{item.precipitationProbability}%</span>
                )}
              </div>
              <span className="hourly-temp">{formatTemperature(item.temperature, unit)}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
