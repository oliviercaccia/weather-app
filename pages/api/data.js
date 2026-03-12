import cityConfig from "../../config/city.json";

export default async function handler(req, res) {
  try {
    const { city, country, latitude, longitude, timezone } = cityConfig;

    const params = new URLSearchParams({
      latitude,
      longitude,
      current: [
        "temperature_2m",
        "apparent_temperature",
        "weather_code",
        "wind_speed_10m",
        "wind_direction_10m",
        "relative_humidity_2m",
        "visibility",
        "is_day",
      ].join(","),
      daily: "sunrise,sunset",
      timezone,
      forecast_days: 1,
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

    const response = await fetch(url);
    const raw = await response.json();

    const c = raw.current;
    const d = raw.daily;

    const data = {
      name: city,
      sys: {
        country,
        sunrise: Math.floor(new Date(d.sunrise[0]).getTime() / 1000),
        sunset: Math.floor(new Date(d.sunset[0]).getTime() / 1000),
      },
      weather: [
        {
          code: c.weather_code,
          is_day: c.is_day,
        },
      ],
      main: {
        temp: c.temperature_2m,
        feels_like: c.apparent_temperature,
        humidity: c.relative_humidity_2m,
      },
      wind: {
        speed: c.wind_speed_10m,
        deg: c.wind_direction_10m,
      },
      visibility: c.visibility,
    };

    res.status(200).json(data);
  } catch (error) {
    console.error("API météo error:", error);
    res.status(500).json({ error: true });
  }
}
