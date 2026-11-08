import React, { useState, useEffect } from 'react';
import { Search, Globe2, Navigation, Settings2, X, CloudSun } from 'lucide-react';
import { Place } from '../../types/weather';
import { UnitsConfig, TemperatureUnit } from '../../types/units';
import { useDebounce } from '../../hooks/useDebounce';
import { searchPlaces } from '../../api/openMeteo';
import './DesktopNavbar.css';

interface DesktopNavbarProps {
  places: Place[];
  activePlaceId: string;
  units: UnitsConfig;
  onSelectPlace: (place: Place) => void;
  onAddPlace: (place: Place) => void;
  onOpenCountryPicker: () => void;
  onOpenSettings: () => void;
  onUseCurrentLocation: () => void;
  onToggleTempUnit: (unit: TemperatureUnit) => void;
  isLocating: boolean;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  places,
  activePlaceId,
  units,
  onSelectPlace,
  onAddPlace,
  onOpenCountryPicker,
  onOpenSettings,
  onUseCurrentLocation,
  onToggleTempUnit,
  isLocating,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Place[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    let active = true;

    async function runSearch() {
      if (debouncedQuery.trim().length < 2) {
        setResults([]);
        setIsSearching(false);
        return;
      }
      setIsSearching(true);
      try {
        const res = await searchPlaces(debouncedQuery);
        if (active) {
          setResults(res);
          setIsSearching(false);
        }
      } catch {
        if (active) {
          setResults([]);
          setIsSearching(false);
        }
      }
    }

    runSearch();

    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  const handleSelectResult = (place: Place) => {
    onAddPlace(place);
    onSelectPlace(place);
    setQuery('');
    setResults([]);
  };

  return (
    <>
      <header className="desktop-nav" aria-label="Desktop top navigation">
        {/* Brand */}
        <div className="desktop-brand">
          <CloudSun size={26} color="#60cdff" />
          <span>Hush</span>
          <span className="desktop-brand-badge">Desktop</span>
        </div>

        {/* Live Search Bar */}
        <div className="desktop-center-search">
          <Search size={16} className="desktop-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="desktop-search-input"
            placeholder="Search any city or place in the world..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Desktop search location"
          />
          {query && (
            <button
              className="places-search-clear"
              style={{ top: '9px' }}
              onClick={() => setQuery('')}
              aria-label="Clear desktop search"
            >
              <X size={14} />
            </button>
          )}

          {/* Autocomplete dropdown */}
          {(results.length > 0 || isSearching) && (
            <div className="desktop-search-dropdown" role="listbox">
              {isSearching && (
                <div style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
                  Searching locations...
                </div>
              )}
              {results.map((r) => (
                <button
                  key={r.id}
                  className="search-result-item"
                  role="option"
                  aria-selected={false}
                  onClick={() => handleSelectResult(r)}
                >
                  <span className="search-result-title">{r.name}</span>
                  <span className="search-result-subtitle">
                    {[r.admin1, r.country].filter(Boolean).join(', ')}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="desktop-actions">
          {/* Country Directory Button */}
          <button
            className="desktop-action-btn"
            onClick={onOpenCountryPicker}
            aria-label="Choose country from directory"
          >
            <Globe2 size={16} color="#60cdff" />
            <span>All Countries</span>
          </button>

          {/* Use My Location GPS */}
          <button
            className="desktop-action-btn"
            onClick={onUseCurrentLocation}
            disabled={isLocating}
            aria-label="Use current GPS location"
          >
            <Navigation size={15} />
            <span>{isLocating ? 'Locating...' : 'My Location'}</span>
          </button>

          {/* Fast Temp Unit Switcher */}
          <div className="desktop-unit-toggle" role="radiogroup" aria-label="Quick temperature unit">
            <button
              className={`desktop-unit-btn ${units.temperature === 'celsius' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.temperature === 'celsius'}
              onClick={() => onToggleTempUnit('celsius')}
            >
              °C
            </button>
            <button
              className={`desktop-unit-btn ${units.temperature === 'fahrenheit' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.temperature === 'fahrenheit'}
              onClick={() => onToggleTempUnit('fahrenheit')}
            >
              °F
            </button>
          </div>

          {/* Full Settings */}
          <button
            className="desktop-action-btn"
            onClick={onOpenSettings}
            aria-label="Open detailed measurement units settings"
          >
            <Settings2 size={16} />
          </button>
        </div>
      </header>

      {/* Desktop Saved Places quick chips */}
      <div className="desktop-places-bar" role="tablist" aria-label="Quick saved locations">
        {places.map((place) => {
          const isActive = place.id === activePlaceId;
          return (
            <button
              key={place.id}
              role="tab"
              aria-selected={isActive}
              className={`desktop-place-chip ${isActive ? 'active' : ''}`}
              onClick={() => onSelectPlace(place)}
            >
              {place.isCurrentLocation && <Navigation size={12} />}
              <span>{place.name}</span>
              {place.country && <span style={{ opacity: 0.6, fontSize: '11px' }}>({place.countryCode || place.country})</span>}
            </button>
          );
        })}
      </div>
    </>
  );
};
