import React from 'react';
import { X, Check } from 'lucide-react';
import {
  UnitsConfig,
  TemperatureUnit,
  SpeedUnit,
  PrecipitationUnit,
  PressureUnit,
  DistanceUnit,
  AppearanceMode,
} from '../../types/units';
import './UnitsModal.css';

interface UnitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  units: UnitsConfig;
  onUpdateUnits: (updated: Partial<UnitsConfig>) => void;
}

export const UnitsModal: React.FC<UnitsModalProps> = ({
  isOpen,
  onClose,
  units,
  onUpdateUnits,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="units-modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Measurement units and appearance settings"
    >
      <div className="units-modal-card">
        <div className="units-modal-header">
          <h3 className="units-modal-title">Units of Measurement</h3>
          <button className="places-close-btn" onClick={onClose} aria-label="Close units modal">
            <X size={18} />
          </button>
        </div>

        {/* Appearance & Contrast */}
        <div className="units-group">
          <div className="units-group-label">Appearance (Contrast Mode)</div>
          <div className="units-segmented-control" role="radiogroup" aria-label="Appearance mode">
            <button
              className={`units-segment-btn ${units.appearance === 'auto' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.appearance === 'auto'}
              onClick={() => onUpdateUnits({ appearance: 'auto' as AppearanceMode })}
            >
              Auto (Weather)
            </button>
            <button
              className={`units-segment-btn ${units.appearance === 'light' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.appearance === 'light'}
              onClick={() => onUpdateUnits({ appearance: 'light' as AppearanceMode })}
            >
              Light (Black UI)
            </button>
            <button
              className={`units-segment-btn ${units.appearance === 'dark' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.appearance === 'dark'}
              onClick={() => onUpdateUnits({ appearance: 'dark' as AppearanceMode })}
            >
              Dark (White UI)
            </button>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', marginTop: '6px' }}>
            {units.appearance === 'auto' && 'Automatically adapts: light theme with dark text during snow/fog/bright days, dark theme at night.'}
            {units.appearance === 'light' && 'Forces clean light background with sharp high-contrast dark text and controls.'}
            {units.appearance === 'dark' && 'Forces dark sky gradient with crisp white text and glowing controls.'}
          </div>
        </div>

        {/* Temperature */}
        <div className="units-group">
          <div className="units-group-label">Temperature</div>
          <div className="units-segmented-control" role="radiogroup" aria-label="Temperature unit">
            <button
              className={`units-segment-btn ${units.temperature === 'celsius' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.temperature === 'celsius'}
              onClick={() => onUpdateUnits({ temperature: 'celsius' as TemperatureUnit })}
            >
              Celsius (°C)
            </button>
            <button
              className={`units-segment-btn ${units.temperature === 'fahrenheit' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.temperature === 'fahrenheit'}
              onClick={() => onUpdateUnits({ temperature: 'fahrenheit' as TemperatureUnit })}
            >
              Fahrenheit (°F)
            </button>
          </div>
        </div>

        {/* Wind Speed */}
        <div className="units-group">
          <div className="units-group-label">Wind Speed</div>
          <div className="units-segmented-control" role="radiogroup" aria-label="Wind speed unit">
            <button
              className={`units-segment-btn ${units.speed === 'kmh' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.speed === 'kmh'}
              onClick={() => onUpdateUnits({ speed: 'kmh' as SpeedUnit })}
            >
              Kilometers/hour (km/h)
            </button>
            <button
              className={`units-segment-btn ${units.speed === 'mph' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.speed === 'mph'}
              onClick={() => onUpdateUnits({ speed: 'mph' as SpeedUnit })}
            >
              Miles/hour (mph)
            </button>
          </div>
        </div>

        {/* Precipitation */}
        <div className="units-group">
          <div className="units-group-label">Precipitation</div>
          <div className="units-segmented-control" role="radiogroup" aria-label="Precipitation unit">
            <button
              className={`units-segment-btn ${units.precipitation === 'mm' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.precipitation === 'mm'}
              onClick={() => onUpdateUnits({ precipitation: 'mm' as PrecipitationUnit })}
            >
              Millimeters (mm)
            </button>
            <button
              className={`units-segment-btn ${units.precipitation === 'inch' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.precipitation === 'inch'}
              onClick={() => onUpdateUnits({ precipitation: 'inch' as PrecipitationUnit })}
            >
              Inches (in)
            </button>
          </div>
        </div>

        {/* Distance / Visibility */}
        <div className="units-group">
          <div className="units-group-label">Visibility</div>
          <div className="units-segmented-control" role="radiogroup" aria-label="Visibility unit">
            <button
              className={`units-segment-btn ${units.distance === 'km' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.distance === 'km'}
              onClick={() => onUpdateUnits({ distance: 'km' as DistanceUnit })}
            >
              Kilometers (km)
            </button>
            <button
              className={`units-segment-btn ${units.distance === 'mi' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.distance === 'mi'}
              onClick={() => onUpdateUnits({ distance: 'mi' as DistanceUnit })}
            >
              Miles (mi)
            </button>
          </div>
        </div>

        {/* Pressure */}
        <div className="units-group">
          <div className="units-group-label">Pressure</div>
          <div className="units-segmented-control" role="radiogroup" aria-label="Pressure unit">
            <button
              className={`units-segment-btn ${units.pressure === 'hPa' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.pressure === 'hPa'}
              onClick={() => onUpdateUnits({ pressure: 'hPa' as PressureUnit })}
            >
              Hectopascals (hPa)
            </button>
            <button
              className={`units-segment-btn ${units.pressure === 'inHg' ? 'active' : ''}`}
              role="radio"
              aria-checked={units.pressure === 'inHg'}
              onClick={() => onUpdateUnits({ pressure: 'inHg' as PressureUnit })}
            >
              Inches of Mercury (inHg)
            </button>
          </div>
        </div>

        <button
          style={{
            width: '100%',
            marginTop: '12px',
            padding: '12px',
            borderRadius: '12px',
            background: 'var(--chip-active-bg)',
            border: 'var(--chip-active-border)',
            color: 'var(--chip-active-color)',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          <Check size={18} />
          <span>Done</span>
        </button>
      </div>
    </div>
  );
};
