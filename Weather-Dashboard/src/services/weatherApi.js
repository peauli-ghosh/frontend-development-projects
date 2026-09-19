const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const CURRENT_URL =
  "https://api.openweathermap.org/data/2.5/weather";

const FORECAST_URL =
  "https://api.openweathermap.org/data/2.5/forecast";

const DAILY_FORECAST_URL =
  "https://api.openweathermap.org/data/2.5/forecast/daily";

const GEOCODING_URL =
  "https://api.openweathermap.org/geo/1.0/direct";

const AIR_URL =
  "https://api.openweathermap.org/data/2.5/air_pollution";

const ICON_URL = (icon) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`;

function ensureApiKey() {
  if (!API_KEY) {
    throw new Error(
      "OpenWeatherMap API key is missing. Add VITE_OPENWEATHER_API_KEY to your .env file."
    );
  }
}

async function fetchJson(url) {
  const response = await fetch(url);

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        "Location not found. Please check the spelling and try again."
      );
    }

    if (response.status === 401) {
      throw new Error("Invalid OpenWeatherMap API key.");
    }

    if (response.status === 429) {
      throw new Error(
        "Weather API request limit reached. Please try again later."
      );
    }

    throw new Error(
      data?.message || "Unable to fetch weather data."
    );
  }

  return data;
}

function countryName(code) {
  try {
    return new Intl.DisplayNames(["en"], {
      type: "region"
    }).of(code) || code;
  } catch {
    return code;
  }
}

function formatLocalDate(timestamp, timezoneOffset) {
  const date = new Date(
    (timestamp + timezoneOffset) * 1000
  );

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
  }).format(date);
}

function formatTime(timestamp, timezoneOffset) {
  const date = new Date(
    (timestamp + timezoneOffset) * 1000
  );

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC"
  }).format(date);
}

function formatHour(timestamp, timezoneOffset = 0) {
  const date = new Date((Number(timestamp) + Number(timezoneOffset)) * 1000);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC"
  }).format(date);
}

function formatDay(timestamp, timezoneOffset = 0) {
  const date = new Date((Number(timestamp) + Number(timezoneOffset)) * 1000);

  return new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "UTC"
  }).format(date);
}

function isNight(timestamp, sunrise, sunset) {
  return timestamp < sunrise || timestamp >= sunset;
}

/* =========================================================
   EXACT 30-PHOTO WEATHER CLASSIFICATION
   ========================================================= */

export function getWeatherImage({
  id,
  description = "",
  clouds = 0,
  windSpeed = 0,
  timestamp,
  sunrise,
  sunset
}) {
  const text = description.toLowerCase();
  const night = isNight(timestamp, sunrise, sunset);
  const suffix = night ? "night" : "morning";

  /* Thunderstorm */

  if (id >= 200 && id <= 232) {
    const thunderShower =
      text.includes("rain") ||
      text.includes("shower") ||
      id <= 202 ||
      id >= 230;

    return night
      ? thunderShower
        ? "/weather/thundershowernight.jpg"
        : "/weather/thunderskynight.jpg"
      : thunderShower
        ? "/weather/thundershowermorning.jpg"
        : "/weather/thunderskymorning.jpg";
  }

  /* Rain + snow / sleet */

  if (
    id === 511 ||
    id === 615 ||
    id === 616 ||
    id === 611 ||
    id === 612 ||
    id === 613
  ) {
    return night
      ? "/weather/rainandsnownight.jpg"
      : "/weather/rainandsnowmorning.jpg";
  }

  /* Snow */

  if (id >= 600 && id <= 622) {
    if (
      windSpeed >= 8 ||
      id === 602 ||
      id === 622
    ) {
      return night
        ? "/weather/snowstormnight.jpg"
        : "/weather/snowstormmorning.jpg";
    }

    if (
      id === 601 ||
      id === 602 ||
      id === 621 ||
      id === 622
    ) {
      return night
        ? "/weather/heavysnowfallnight.jpg"
        : "/weather/heavysnowfallmorning.jpg";
    }

    return night
      ? "/weather/lightsnowfallnight.jpg"
      : "/weather/lightsnowfallmorning.jpg";
  }

  /* Rain / drizzle */

  if (
    (id >= 300 && id <= 321) ||
    (id >= 500 && id <= 531)
  ) {
    if (windSpeed >= 7) {
      return night
        ? "/weather/breezyandrainynight.jpg"
        : "/weather/breezyandrainymorning.jpg";
    }

    if (
      id === 302 ||
      id === 312 ||
      id === 314 ||
      id === 502 ||
      id === 503 ||
      id === 504 ||
      id === 522 ||
      id === 531
    ) {
      return night
        ? "/weather/heavyrainnight.jpg"
        : "/weather/heavyrainmorning.jpg";
    }

    return night
      ? "/weather/lightrainnight.jpg"
      : "/weather/lightrainmorning.jpg";
  }

  /* Strong wind gets its own photograph */

  if (windSpeed >= 10) {
    return night
      ? "/weather/windynight.png"
      : "/weather/windymorning.jpg";
  }

  /* Clear */

  if (id === 800) {
    return night
      ? "/weather/clearnight.jpg"
      : "/weather/sunny.jpg";
  }

  /* Clouds */

  if (id === 801) {
    return night
      ? "/weather/mostlyclearnight.jpg"
      : "/weather/mostlysunny.jpg";
  }

  if (id === 802) {
    return night
      ? "/weather/partlycloudypartlyclearnight.jpg"
      : "/weather/partlycloudypartlysunnymorning.jpg";
  }

  if (id === 803) {
    return night
      ? "/weather/mostlycloudynight.jpg"
      : "/weather/mostlycloudymorning.jpg";
  }

  if (id === 804) {
    return night
      ? "/weather/cloudynight.jpg"
      : "/weather/cloudymorning.jpg";
  }

  /* Atmosphere */

  return night
    ? "/weather/cloudynight.jpg"
    : "/weather/cloudymorning.jpg";
}

/* =========================================================
   CITY SUGGESTIONS
   ========================================================= */

export async function getCitySuggestions(query) {
  ensureApiKey();

  const clean = query.trim();

  if (clean.length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    q: clean,
    limit: "5",
    appid: API_KEY
  });

  const data = await fetchJson(
    `${GEOCODING_URL}?${params.toString()}`
  );

  return data.map((item) => ({
    name: item.name,
    state: item.state || "",
    country: item.country,
    countryName: countryName(item.country),
    lat: item.lat,
    lon: item.lon
  }));
}

/* =========================================================
   DAILY FORECAST
   ========================================================= */

function buildDailyForecast(list, timezoneOffset) {
  const buckets = new Map();

  list.forEach((item) => {
    const date = new Date(
      (item.dt + timezoneOffset) * 1000
    );

    const key = date.toISOString().slice(0, 10);

    if (!buckets.has(key)) {
      buckets.set(key, []);
    }

    buckets.get(key).push(item);
  });

  return Array.from(buckets.values())
    .slice(0, 5)
    .map((items, index) => {
      const representative = items.reduce(
        (closest, item) =>
          Math.abs(
            new Date(item.dt_txt).getUTCHours() - 12
          ) <
          Math.abs(
            new Date(closest.dt_txt).getUTCHours() - 12
          )
            ? item
            : closest,
        items[0]
      );

      return {
        day:
          index === 0
            ? "Today"
            : formatDay(
                representative.dt,
                timezoneOffset
              ),

        temp: Math.round(
          items.reduce(
            (sum, item) => sum + item.main.temp,
            0
          ) / items.length
        ),

        high: Math.round(
          Math.max(
            ...items.map((item) => item.main.temp_max)
          )
        ),

        low: Math.round(
          Math.min(
            ...items.map((item) => item.main.temp_min)
          )
        ),

        icon: ICON_URL(
          representative.weather[0].icon
        ),

        description:
          representative.weather[0].description,

        rainChance: Math.round(
          Math.max(
            ...items.map(
              (item) => (item.pop || 0) * 100
            )
          )
        )
      };
    });
}

function buildDailyForecastFromDailyApi(
  list,
  timezoneOffset
) {
  return list
    .slice(0, 7)
    .map((item, index) => ({
      day:
        index === 0
          ? "Today"
          : formatDay(
              item.dt,
              timezoneOffset
            ),

      temp: Math.round(
        item.temp?.day ??
        item.temp?.max ??
        0
      ),

      high: Math.round(
        item.temp?.max ??
        item.temp?.day ??
        0
      ),

      low: Math.round(
        item.temp?.min ??
        item.temp?.day ??
        0
      ),

      icon: ICON_URL(
        item.weather?.[0]?.icon ||
          "01d"
      ),

      description:
        item.weather?.[0]?.description ||
        "Weather unavailable",

      condition:
        item.weather?.[0]?.main ||
        "Unknown",

      rainChance: Math.round(
        (item.pop || 0) * 100
      )
    }));
}


/* =========================================================
   MAIN WEATHER BUNDLE
   ========================================================= */



export async function getWeatherBundleByCoordinates(
  latitude,
  longitude
) {
  ensureApiKey();

  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    units: "metric",
    appid: API_KEY
  });

  const [
    current,
    forecast,
    dailyForecast
  ] = await Promise.all([
    fetchJson(
      `${CURRENT_URL}?${params.toString()}`
    ),

    fetchJson(
      `${FORECAST_URL}?${params.toString()}`
    ),

    fetchJson(
      `${DAILY_FORECAST_URL}?${params.toString()}&cnt=7`
    ).catch(() => null)
  ]);

  const condition =
    current.weather?.[0]?.main ||
    "Unknown";

  const description =
    current.weather?.[0]?.description ||
    "Weather unavailable";

  const icon =
    current.weather?.[0]?.icon ||
    "";

  const weatherId =
    current.weather?.[0]?.id ||
    0;

  const windSpeed =
    current.wind?.speed ||
    0;

  let aqi = null;

  try {
    const air =
      await fetchJson(
        `${AIR_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );

    const airPoint = air?.list?.[0];

    aqi = airPoint
      ? {
          index: airPoint.main?.aqi ?? null,
          pm25: airPoint.components?.pm2_5 ?? null,
          pm10: airPoint.components?.pm10 ?? null,
          co: airPoint.components?.co ?? null,
          no2: airPoint.components?.no2 ?? null,
          o3: airPoint.components?.o3 ?? null,
          so2: airPoint.components?.so2 ?? null
        }
      : null;
  } catch {
    aqi = null;
  }

  const result = {
    location:
      current.name ||
      "Current location",

    displayLocation:
      `${current.name || "Current location"}, ${current.sys?.country || ""}`.replace(/, $/, ""),

    country:
      current.sys?.country || "",

    countryName:
      countryName(
        current.sys?.country || ""
      ),

    coordinates: {
      lat: current.coord.lat,
      lon: current.coord.lon
    },

    localDate:
      formatLocalDate(
        current.dt,
        current.timezone
      ),

    current: {
      temperature:
        Math.round(
          current.main.temp
        ),

      feelsLike:
        Math.round(
          current.main.feels_like
        ),

      humidity:
        current.main.humidity,

      windSpeed:
        Math.round(
          windSpeed * 3.6
        ),

      pressure:
        current.main.pressure,

      condition,

      description,

      icon:
        ICON_URL(icon),

      conditionGroup: condition.toLowerCase(),

      high:
        Math.round(
          current.main.temp_max
        ),

      low:
        Math.round(
          current.main.temp_min
        ),

      visibility:
        current.visibility != null
          ? (
              current.visibility /
              1000
            ).toFixed(1)
          : "10+",

      cloudiness:
        current.clouds?.all ?? 0,

      weatherId,

      backgroundImage:
        getWeatherImage({
          id: weatherId,
          description,
          icon,
          windSpeed,
          timestamp: current.dt,
          sunrise: current.sys?.sunrise,
          sunset: current.sys?.sunset
        })
    },

    sunrise:
      formatTime(
        current.sys.sunrise,
        current.timezone
      ),

    sunset:
      formatTime(
        current.sys.sunset,
        current.timezone
      ),

    timezone:
      current.timezone,

    aqi,

    hourly:
      forecast.list
        .slice(0, 8)
        .map((item) => ({
          time:
            formatHour(
              item.dt,
              forecast.city.timezone
            ),

          temp:
            Math.round(
              item.main.temp
            ),

          icon:
            ICON_URL(
              item.weather[0].icon
            ),

          condition:
            item.weather[0].main,

          description:
            item.weather[0]
              .description,

          rainChance:
            Math.round(
              (item.pop || 0) *
              100
            )
        })),

    daily:
      dailyForecast
        ? buildDailyForecastFromDailyApi(
            dailyForecast.list || [],
            dailyForecast.city?.timezone ??
              current.timezone
          )
        : buildDailyForecast(
            forecast.list,
            forecast.city.timezone
          )
  };

  return result;
}

export async function getWeatherBundle(locationInput) {
  ensureApiKey();

  let location;

  if (
    locationInput &&
    typeof locationInput === "object" &&
    locationInput.lat != null &&
    locationInput.lon != null
  ) {
    location = locationInput;
  } else {
    const suggestions = await getCitySuggestions(
      String(locationInput || "").trim()
    );

    if (!suggestions.length) {
      throw new Error(
        "Location not found. Please check the spelling and try again."
      );
    }

    location = suggestions[0];
  }

  const baseParams = new URLSearchParams({
    lat: String(location.lat),
    lon: String(location.lon),
    units: "metric",
    appid: API_KEY
  });

  const [
    current,
    forecast,
    airResult
  ] =
    await Promise.all([
      fetchJson(
        `${CURRENT_URL}?${baseParams.toString()}`
      ),

      fetchJson(
        `${FORECAST_URL}?${baseParams.toString()}`
      ),

      fetchJson(
        `${AIR_URL}?${baseParams.toString()}`
      ).catch(() => null)
    ]);

  const currentWeather =
    current.weather?.[0] || {};

  const id = currentWeather.id || 800;
  const condition =
    currentWeather.main || "Unknown";
  const description =
    currentWeather.description ||
    "Weather unavailable";

  const backgroundImage = getWeatherImage({
    id,
    description,
    clouds: current.clouds?.all || 0,
    windSpeed: current.wind?.speed || 0,
    timestamp: current.dt,
    sunrise: current.sys.sunrise,
    sunset: current.sys.sunset
  });

  const hourly = forecast.list
    .slice(0, 8)
    .map((item) => ({
      time: formatHour(
        item.dt,
        forecast.city.timezone
      ),

      temp: Math.round(item.main.temp),

      icon: ICON_URL(
        item.weather[0].icon
      ),

      rainChance: Math.round(
        (item.pop || 0) * 100
      ),

      description:
        item.weather[0].description,

      condition:
        item.weather[0].main
    }));

  const next24Hours = forecast.list.slice(0, 8);

  const maxRainChance = Math.round(
    Math.max(
      ...next24Hours.map(
        (item) => (item.pop || 0) * 100
      )
    )
  );

  const air = airResult?.list?.[0];

  return {
    location: current.name,

    displayLocation: [
      current.name,
      location.state
    ]
      .filter(Boolean)
      .join(", "),

    country: current.sys.country,

    countryName: countryName(
      current.sys.country
    ),

    coordinates: {
      lat: current.coord.lat,
      lon: current.coord.lon
    },

    localDate: formatLocalDate(
      current.dt,
      current.timezone
    ),

    current: {
      temperature: Math.round(
        current.main.temp
      ),

      feelsLike: Math.round(
        current.main.feels_like
      ),

      humidity: current.main.humidity,

      windSpeed: Math.round(
        current.wind.speed * 3.6
      ),

      windDirection:
        current.wind.deg ?? 0,

      pressure:
        current.main.pressure,

      visibility: Math.round(
        (current.visibility || 0) / 1000
      ),

      cloudiness:
        current.clouds?.all ?? 0,

      condition,

      description,

      weatherId: id,

      icon: ICON_URL(
        currentWeather.icon
      ),

      conditionGroup:
        condition.toLowerCase(),

      backgroundImage,

      high: Math.round(
        current.main.temp_max
      ),

      low: Math.round(
        current.main.temp_min
      )
    },

    sunrise: formatTime(
      current.sys.sunrise,
      current.timezone
    ),

    sunset: formatTime(
      current.sys.sunset,
      current.timezone
    ),

    sunriseTimestamp:
      current.sys.sunrise,

    sunsetTimestamp:
      current.sys.sunset,

    timezone:
      current.timezone,

    hourly,

    daily: buildDailyForecast(
      forecast.list,
      forecast.city.timezone
    ),

    rainChance24h: maxRainChance,

    aqi: air
      ? {
          index: air.main.aqi,

          pm25: air.components.pm2_5,

          pm10: air.components.pm10,

          co: air.components.co,

          no2: air.components.no2,

          o3: air.components.o3,

          so2: air.components.so2
        }
      : null
  };
}







