import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver for jsdom
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock HTMLCanvasElement getContext for jsdom
HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue({
  clearRect: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  moveTo: vi.fn(),
  lineTo: vi.fn(),
  fillRect: vi.fn(),
  ellipse: vi.fn(),
  fillStyle: '',
  strokeStyle: '',
  lineWidth: 1,
  globalAlpha: 1,
}) as unknown as typeof HTMLCanvasElement.prototype.getContext;

// Default global fetch mock for tests
globalThis.fetch = vi.fn().mockImplementation((url: string) => {
  if (url.includes('geocoding-api')) {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          results: [
            {
              id: 1,
              name: 'Cupertino',
              latitude: 37.323,
              longitude: -122.0322,
              country: 'United States',
              admin1: 'California',
            },
          ],
        }),
    });
  }

  // Open-Meteo forecast mock
  return Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        latitude: 37.323,
        longitude: -122.0322,
        utc_offset_seconds: -28800,
        timezone: 'America/Los_Angeles',
        current: {
          time: '2026-11-08T18:00',
          temperature_2m: 21,
          relative_humidity_2m: 55,
          apparent_temperature: 21,
          is_day: 1,
          precipitation: 0,
          weather_code: 0,
          surface_pressure: 1016,
          wind_speed_10m: 12,
          wind_direction_10m: 250,
          wind_gusts_10m: 18,
        },
        hourly: {
          time: Array.from({ length: 48 }, (_, i) => {
            const h = i.toString().padStart(2, '0');
            return `2026-11-08T${h}:00`;
          }),
          temperature_2m: Array(48).fill(21),
          relative_humidity_2m: Array(48).fill(55),
          dew_point_2m: Array(48).fill(12),
          apparent_temperature: Array(48).fill(21),
          precipitation_probability: Array(48).fill(0),
          precipitation: Array(48).fill(0),
          weather_code: Array(48).fill(0),
          surface_pressure: Array(48).fill(1016),
          visibility: Array(48).fill(10000),
          wind_speed_10m: Array(48).fill(12),
          wind_direction_10m: Array(48).fill(250),
          uv_index: Array(48).fill(3),
          is_day: Array(48).fill(1),
        },
        daily: {
          time: ['2026-11-08', '2026-11-09', '2026-11-10'],
          weather_code: [0, 1, 2],
          temperature_2m_max: [24, 23, 22],
          temperature_2m_min: [14, 13, 12],
          apparent_temperature_max: [24, 23, 22],
          apparent_temperature_min: [14, 13, 12],
          sunrise: ['2026-11-08T06:30', '2026-11-09T06:31', '2026-11-10T06:32'],
          sunset: ['2026-11-08T17:30', '2026-11-09T17:29', '2026-11-10T17:28'],
          uv_index_max: [4, 4, 3],
          precipitation_sum: [0, 0, 0],
          precipitation_probability_max: [0, 10, 20],
          wind_speed_10m_max: [14, 12, 15],
          wind_gusts_10m_max: [20, 18, 22],
        },
      }),
  });
}) as unknown as typeof fetch;
