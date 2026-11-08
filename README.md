# Aether Weather

An Apple iOS Weather-inspired web application crafted with React, TypeScript, plain CSS, and the Open-Meteo API. Built for modern browsers with dynamic atmospheric particle canvases, fluid glassmorphism, a condensing hero header, and detailed meteorological metrics.

[![CI](https://github.com/<username>/<repo-name>/actions/workflows/ci.yml/badge.svg)](https://github.com/<username>/<repo-name>/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF)](https://vitejs.dev/)

> **Live Demo:** [https://<username>.github.io/<repo-name>/](https://<username>.github.io/<repo-name>/)  
> *(Replace `<username>` and `<repo-name>` with your GitHub account and repository)*

---

## Previews

| Mobile Portrait | Tablet & Desktop |
| :---: | :---: |
| ![Hero & Hourly Preview](docs/screenshots/hero-preview.png) | ![10-Day Forecast & Detail Tiles](docs/screenshots/forecast-preview.png) |

*(Screenshots can be placed in `docs/screenshots/`)*

---

## Key Features

- **Apple-Inspired Condensing Header:** Full-height hero displaying city, ultra-light large temperature (96px, weight 200), condition, and high/low. Smoothly collapses on scroll into a frosted glass sticky header without abrupt pop-in.
- **Dynamic Atmospheric Backgrounds:** Pure CSS/Canvas gradient & particle simulation adapting to WMO weather codes and local day/night status. Features drifting clouds, twinkling stars, angled rain streaks, soft snowflakes, and occasional thunderstorm lightning flashes. Fully honors `prefers-reduced-motion`.
- **24-Hour Hourly Strip:** Horizontally scrollable strip with `scroll-snap`. Displays "Now", weather icons, hourly temperatures, light blue precipitation probabilities (when &ge; 20%), and seamlessly chronologically inserted sunrise/sunset events.
- **10-Day Forecast Card:** Daily breakdown with custom cool-to-warm colored range bars positioned proportionally against the entire 10-day temperature span, complete with a current temperature indicator dot on the "Today" row.
- **8 Meteorological Detail Tiles:** 2-column glass grid including:
  - **UV Index:** Gradient gauge bar with indicator pip and sun protection advice.
  - **Sun Trajectory Arc:** SVG bezier arc tracing the sun's position across daylight hours with sunrise/sunset timing.
  - **Wind & Compass Dial:** Rotating compass dial needle pointing in the live wind direction, showing speed and gusts.
  - **Feels Like:** Apparent temperature contextualized against humidity and wind chill.
  - **Humidity & Dew Point:** Relative humidity percentage with calculated Magnus-Tetens dew point.
  - **Visibility:** Distance in kilometers or miles with atmospheric clarity assessment.
  - **Pressure:** Surface pressure in hPa or inHg with system trend indicators.
  - **Precipitation:** 24-hour total and expected rainfall metrics.
- **Search & Places Drawer:** Debounced autocomplete search powered by the Open-Meteo Geocoding API, "Use Current Location" GPS fallback, saved places list, and swipe/drag navigation between saved cities.
- **Customizable Units System:** Toggles for &deg;C/&deg;F, km/h vs. mph, mm vs. in, hPa vs. inHg, and km vs. mi. Automatically defaults to the user's browser locale and persists across sessions in `localStorage`.
- **Resilient Offline Architecture:** 10-minute cache with timestamps, zero layout shift shimmer skeletons, offline network detection banner, and graceful error retry screens.
- **Accessible & Semantic:** Keyboard navigation (Arrow keys for cities, Tab indexing), semantic HTML5 landmarks, explicit ARIA labels, and WCAG AA contrast standards.

---

## Tech Stack

- **Core:** React 18, TypeScript 5.7, Vite 6
- **Styling:** Vanilla CSS with custom properties (CSS variables), glassmorphism (`backdrop-filter: blur(20px)`), and hardware-accelerated animations (no UI component libraries)
- **Data Source:** [Open-Meteo Forecast & Geocoding API](https://open-meteo.com/) (CORS-enabled, zero API keys required, `timezone=auto`, 10 forecast days)
- **Icons:** [Lucide React](https://lucide.dev/) (ISC License, customizable semantic SVGs)
- **Testing:** [Vitest](https://vitest.dev/) with `@testing-library/react` and `jsdom`
- **Linting & Code Quality:** ESLint 9 (flat config) and Prettier

---

## Project Structure

```text
weather-app/
├── .github/
│   └── workflows/
│       ├── ci.yml            # Lint, typecheck, unit test, build
│       └── deploy.yml        # Automated GitHub Pages deployment
├── docs/
│   └── screenshots/          # Place screenshots here
├── src/
│   ├── api/
│   │   ├── cache.ts          # 10-minute localStorage/memory caching layer
│   │   └── openMeteo.ts      # Open-Meteo forecast and geocoding clients
│   ├── components/
│   │   ├── Background/       # Dynamic gradients and atmospheric canvas particles
│   │   ├── Daily/            # 10-Day forecast card with temperature range bars
│   │   ├── Details/          # 8 metric detail tiles (UV, Sun Arc, Wind, etc.)
│   │   ├── Hero/             # Large temperature hero and condensing sticky header
│   │   ├── Hourly/           # 24-hour horizontal scrolling forecast strip
│   │   ├── Navigation/       # Bottom toolbar with place dots and list buttons
│   │   ├── Places/           # Saved places manager with geocoding search
│   │   ├── Settings/         # Units of measurement modal
│   │   └── UI/               # Skeletons, error screens, icons, offline banner
│   ├── constants/
│   │   ├── defaultLocations.ts # Pre-configured fallback cities
│   │   └── weatherCodes.ts     # Exhaustive WMO code-to-theme mapping
│   ├── hooks/
│   │   ├── useDebounce.ts      # Input debouncing for autocomplete search
│   │   ├── useGeolocation.ts   # Browser GPS location with permission handling
│   │   ├── useLocalStorage.ts  # Typed resilient storage sync
│   │   ├── useScrollPosition.ts# Scroll progress tracker for header collapse
│   │   └── useWeather.ts       # Weather data lifecycle, caching, and refresh
│   ├── types/
│   │   ├── units.ts            # Unit system definitions
│   │   └── weather.ts          # Weather models and Open-Meteo payload types
│   ├── utils/
│   │   ├── date.ts             # Timezone-aware date parsing and formatting
│   │   └── units.ts            # Conversion formulas (temperatures, wind, dew point)
│   ├── App.tsx                 # Root application component and gesture handler
│   ├── index.css               # Global theme variables, reset, and typography
│   └── main.tsx                # React DOM root entry
├── index.html
├── LICENSE                     # MIT License
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## How It Works

### 1. Data Flow & Local Timezone Preservation
1. When a location is selected or detected via GPS, `useWeather` first checks the client cache (`weather_${lat}_${lon}`). If fresh cached data exists (&lt; 10 minutes), it renders instantly without layout shift.
2. If network retrieval is needed, `fetchWeatherForecast` queries Open-Meteo with `timezone=auto` and `forecast_days=10`.
3. Open-Meteo provides ISO timestamp strings in the target location's wall-clock time (e.g. `2026-11-08T18:00`). The custom parser in `src/utils/date.ts` parses components directly without browser UTC distortion.
4. The API layer computes the next 24 consecutive hours and merges sunrise/sunset times into the hourly timeline.

### 2. WMO Weather Code to Atmosphere Mapping
The app maps all official World Meteorological Organization (WMO) codes (0 through 99) in `src/constants/weatherCodes.ts`:
- **Codes 0, 1:** Clear sky (day theme vs. clear night theme with twinkling stars).
- **Code 2:** Partly cloudy (soft drifting cloud particles).
- **Code 3:** Overcast (slate grey atmospheric sky).
- **Codes 45, 48:** Fog (drifting horizontal mist layers).
- **Codes 51–67, 80–82:** Rain & Drizzle (angled falling precipitation streaks).
- **Codes 71–77, 85–86:** Snow (fluttering sinusoidal snowflake physics).
- **Codes 95–99:** Thunderstorm (heavy rain + randomized lightning flashes).

Transitions between themes cross-fade smoothly over an 800ms duration.

---

## Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/<username>/<repo-name>.git
cd <repo-name>
npm install
```

### Development
Start the local Vite development server with Hot Module Replacement:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run Tests
Execute the Vitest test suite:
```bash
npm test
```

### Type Checking & Linting
Validate TypeScript types and ESLint rules:
```bash
npm run typecheck
npm run lint
```

### Production Build & Preview
Create an optimized production bundle:
```bash
npm run build
npm run preview
```

---

## Roadmap

- [ ] **Air Quality Index (AQI):** Add real-time PM2.5, PM10, and ozone monitoring via the Open-Meteo Air Quality API.
- [ ] **Progressive Web App (PWA):** Service worker caching and install-to-home-screen manifest for iOS and Android.
- [ ] **Severe Weather Alerts:** Integration with government meteorological alert feeds.
- [ ] **Interactive Precipitation Radar:** Animated radar overlay map.

---

## Credits & Attribution

- **Weather Data:** Weather forecasts, historical models, and geocoding provided by [Open-Meteo.com](https://open-meteo.com/) under the [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) license.
- **Icons:** Open-source iconography provided by [Lucide](https://lucide.dev/) under the ISC License.

---

## Disclaimer

This is an independent open-source project created for portfolio and educational purposes, inspired by the interface design of Apple's iOS Weather app. This project is **not** affiliated with, endorsed by, or sponsored by Apple Inc. Apple, iOS, and SF Symbols are registered trademarks of Apple Inc.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
