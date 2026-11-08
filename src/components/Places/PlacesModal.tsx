import React, { useState, useEffect } from 'react';
import { Search, X, Trash2, Navigation, MapPin, Globe2 } from 'lucide-react';
import { Place } from '../../types/weather';
import { useDebounce } from '../../hooks/useDebounce';
import { searchPlaces } from '../../api/openMeteo';
import './PlacesModal.css';

interface PlacesModalProps {
  isOpen: boolean;
  onClose: () => void;
  places: Place[];
  activePlaceId: string;
  onSelectPlace: (place: Place) => void;
  onAddPlace: (place: Place) => void;
  onDeletePlace: (placeId: string) => void;
  onUseCurrentLocation: () => void;
  onOpenCountryPicker?: () => void;
  isLocating: boolean;
}

export const PlacesModal: React.FC<PlacesModalProps> = ({
  isOpen,
  onClose,
  places,
  activePlaceId,
  onSelectPlace,
  onAddPlace,
  onDeletePlace,
  onUseCurrentLocation,
  onOpenCountryPicker,
  isLocating,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);
  const debouncedQuery = useDebounce(searchQuery, 350);

  useEffect(() => {
    let active = true;

    async function performSearch() {
      if (debouncedQuery.trim().length < 2) {
        setSearchResults([]);
        setSearching(false);
        return;
      }

      setSearching(true);
      try {
        const results = await searchPlaces(debouncedQuery);
        if (active) {
          setSearchResults(results);
          setSearching(false);
        }
      } catch {
        if (active) {
          setSearchResults([]);
          setSearching(false);
        }
      }
    }

    performSearch();

    return () => {
      active = false;
    };
  }, [debouncedQuery]);

  if (!isOpen) return null;

  const handleSelectSearchResult = (p: Place) => {
    onAddPlace(p);
    onSelectPlace(p);
    setSearchQuery('');
    setSearchResults([]);
    onClose();
  };

  return (
    <div
      className="places-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Manage weather places"
    >
      <div className="places-modal-container">
        {/* Header */}
        <div className="places-header">
          <h2 className="places-title">Weather</h2>
          <button className="places-close-btn" onClick={onClose} aria-label="Close saved places">
            <X size={20} />
          </button>
        </div>

        {/* Search Input */}
        <div className="places-search-box">
          <Search size={18} className="places-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="places-search-input"
            placeholder="Search for a city or airport"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            aria-label="Search city or location"
          />
          {searchQuery && (
            <button
              className="places-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search input"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Quick Country Directory Button */}
        {onOpenCountryPicker && (
          <button
            className="location-action-btn"
            style={{
              marginBottom: '14px',
              borderRadius: '12px',
              background: 'rgba(96, 205, 255, 0.12)',
              border: '1px solid rgba(96, 205, 255, 0.25)',
              color: '#60cdff',
            }}
            onClick={() => {
              onClose();
              onOpenCountryPicker();
            }}
          >
            <Globe2 size={18} />
            <span>Browse All Countries & Capitals</span>
          </button>
        )}

        {/* Search Results Dropdown */}
        {(searchResults.length > 0 || searching || searchQuery.length >= 2) && (
          <div className="places-search-results" role="listbox" aria-label="Search results">
            {/* Quick GPS Location option */}
            <button
              className="location-action-btn"
              onClick={() => {
                onUseCurrentLocation();
                onClose();
              }}
              disabled={isLocating}
            >
              <Navigation size={16} />
              <span>{isLocating ? 'Locating...' : 'Use Current Location'}</span>
            </button>

            {searching && (
              <div style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                Searching locations...
              </div>
            )}

            {!searching && searchResults.length === 0 && (
              <div style={{ padding: '12px 16px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                No matching cities found.
              </div>
            )}

            {searchResults.map((result) => (
              <button
                key={result.id}
                className="search-result-item"
                role="option"
                aria-selected={false}
                onClick={() => handleSelectSearchResult(result)}
              >
                <span className="search-result-title">{result.name}</span>
                <span className="search-result-subtitle">
                  {[result.admin1, result.country].filter(Boolean).join(', ')}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Saved Places List */}
        <div className="saved-places-list" role="list" aria-label="Saved weather places">
          {places.map((place) => {
            const isActive = place.id === activePlaceId;
            return (
              <div
                key={place.id}
                className={`saved-place-card ${isActive ? 'active-place' : ''}`}
                role="listitem"
              >
                <button
                  style={{
                    flex: 1,
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    onSelectPlace(place);
                    onClose();
                  }}
                  aria-label={`Select ${place.name}`}
                >
                  <div className="saved-place-info">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {place.isCurrentLocation && (
                        <Navigation size={14} style={{ opacity: 0.8 }} aria-label="GPS location" />
                      )}
                      <span className="saved-place-name">{place.name}</span>
                    </div>
                    <span className="saved-place-sub">
                      {[place.admin1, place.country].filter(Boolean).join(', ') || 'Saved Location'}
                    </span>
                  </div>
                </button>

                <div className="saved-place-right">
                  {places.length > 1 && (
                    <button
                      className="saved-place-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeletePlace(place.id);
                      }}
                      aria-label={`Remove ${place.name} from saved places`}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info */}
        <div style={{ textAlign: 'center', marginTop: '24px', opacity: 0.5, fontSize: '12px' }}>
          <MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} />
          <span>{places.length} saved {places.length === 1 ? 'location' : 'locations'}</span>
        </div>
      </div>
    </div>
  );
};
