# WeatherWise

Responsive Weather Dashboard built with React + Vite and the OpenWeatherMap API.

## Assignment requirements covered

- API Integration
- `fetch()`
- `async/await`
- `useEffect()`
- Search by city
- Temperature
- Humidity
- Wind speed
- Weather icon
- Sunrise and sunset
- Loading spinner
- Proper error handling
- Universal responsive layout

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` from `.env.example`.

3. Add your OpenWeatherMap API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_key_here
   ```

4. Start:
   ```bash
   npm run dev
   ```

5. Verify production build:
   ```bash
   npm run build
   ```

## Notes

The dashboard uses OpenWeatherMap's Current Weather API for the required live weather data and its 5-day / 3-hour Forecast API to reproduce the richer hourly/daily presentation shown in the supplied UI reference.

The visual effects intentionally follow the supplied UI/UX guideline: short 150–300ms transitions, interaction feedback, clear loading/error states, restrained decoration, consistent hover/press behavior, accessible contrast, and `prefers-reduced-motion` support.
