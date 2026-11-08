import React, { useState, useMemo } from 'react';
import { Search, X, Globe2, MapPin } from 'lucide-react';
import { COUNTRIES, CountryInfo } from '../../constants/countries';
import { Place } from '../../types/weather';
import './CountryPickerModal.css';

interface CountryPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCountry: (place: Place) => void;
}

const REGIONS = ['All', 'Europe', 'Asia', 'Americas', 'Middle East', 'Africa', 'Oceania'] as const;

export const CountryPickerModal: React.FC<CountryPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectCountry,
}) => {
  const [search, setSearch] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');

  const filteredCountries = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COUNTRIES.filter((c) => {
      const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
      const matchesQuery =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.capital.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q);
      return matchesRegion && matchesQuery;
    });
  }, [search, selectedRegion]);

  if (!isOpen) return null;

  const handleCountryClick = (country: CountryInfo) => {
    const place: Place = {
      id: `country_${country.code.toLowerCase()}_${country.capital.toLowerCase().replace(/\s+/g, '_')}`,
      name: country.capital,
      admin1: country.capital,
      country: country.name,
      countryCode: country.code,
      latitude: country.latitude,
      longitude: country.longitude,
      timezone: country.timezone,
    };
    onSelectCountry(place);
    onClose();
  };

  return (
    <div
      className="country-picker-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Choose country location"
    >
      <div className="country-picker-card">
        {/* Header */}
        <div className="country-picker-header">
          <div className="country-picker-title">
            <Globe2 size={24} color="#60cdff" />
            <span>Select Country Weather</span>
          </div>
          <button className="places-close-btn" onClick={onClose} aria-label="Close country picker">
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="country-search-bar">
          <Search size={18} className="places-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="country-search-input"
            placeholder="Search by country, capital, or code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            aria-label="Filter countries"
          />
          {search && (
            <button
              className="places-search-clear"
              onClick={() => setSearch('')}
              aria-label="Clear country filter"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Region filter chips */}
        <div className="country-region-chips" role="radiogroup" aria-label="Filter by region">
          {REGIONS.map((region) => (
            <button
              key={region}
              role="radio"
              aria-checked={selectedRegion === region}
              className={`country-chip ${selectedRegion === region ? 'active' : ''}`}
              onClick={() => setSelectedRegion(region)}
            >
              {region}
            </button>
          ))}
        </div>

        {/* Country Grid */}
        <div className="country-grid" role="region" aria-label="Country list">
          {filteredCountries.map((c) => (
            <button
              key={c.code}
              className="country-card-item"
              onClick={() => handleCountryClick(c)}
              aria-label={`View weather for ${c.capital}, ${c.name}`}
            >
              <span className="country-flag-emoji" aria-hidden="true">{c.flag}</span>
              <div className="country-item-info">
                <span className="country-item-name">{c.name}</span>
                <span className="country-item-capital">
                  <MapPin size={11} style={{ display: 'inline', marginRight: '3px' }} />
                  {c.capital}
                </span>
              </div>
            </button>
          ))}

          {filteredCountries.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', gridColumn: '1 / -1' }}>
              No country found matching &ldquo;{search}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
