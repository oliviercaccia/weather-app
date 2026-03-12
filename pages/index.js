import { useState, useEffect } from "react";

import { MainCard } from "../components/MainCard";
import { ContentBox } from "../components/ContentBox";
import { Header } from "../components/Header";
import { DateAndTime } from "../components/DateAndTime";
import { MetricsBox } from "../components/MetricsBox";
import { UnitSwitch } from "../components/UnitSwitch";
import { LoadingScreen } from "../components/LoadingScreen";
import { ErrorScreen } from "../components/ErrorScreen";

import styles from "../styles/Home.module.css";

function getWeatherInfo(code, isDay) {
  const weatherMap = {
    0: { icon: "sun", description: "Ciel dégagé" },
    1: { icon: "cloud-sun", description: "Peu nuageux" },
    2: { icon: "cloud", description: "Partiellement nuageux" },
    3: { icon: "cloud", description: "Nuageux" },
    45: { icon: "cloud-fog", description: "Brouillard" },
    48: { icon: "cloud-fog", description: "Brouillard givrant" },
    51: { icon: "cloud-drizzle", description: "Bruine légère" },
    61: { icon: "cloud-rain", description: "Pluie légère" },
    63: { icon: "cloud-rain", description: "Pluie modérée" },
    65: { icon: "cloud-rain", description: "Forte pluie" },
    71: { icon: "cloud-snow", description: "Neige légère" },
    80: { icon: "cloud-showers-heavy", description: "Averses" },
    95: { icon: "bolt", description: "Orage" },
  };

  return weatherMap[code] || { icon: "cloud", description: "Temps inconnu" };
}
// Intervalle de rafraîchissement automatique (10 minutes)
const REFRESH_INTERVAL = 10 * 60 * 1000;

export const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [unitSystem, setUnitSystem] = useState("metric");

  const getData = async () => {
    try {
      setError(false);
      // GET simple — la ville est définie dans config/city.json côté serveur
      const res = await fetch("/api/data");
      const data = await res.json();

      if (data.error) {
        setError(true);
        return;
      }

      // Application du mapper : code WMO → icône SVG + description française
      const { icon, description } = getWeatherInfo(
        data.weather[0].code,
        data.weather[0].is_day,
      );
      data.weather[0].icon = icon;
      data.weather[0].description = description;

      setWeatherData(data);
    } catch (e) {
      console.error("Erreur lors du chargement des données météo :", e);
      setError(true);
    }
  };

  useEffect(() => {
    getData();
    // Rafraîchissement automatique toutes les 10 minutes
    const interval = setInterval(getData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const changeSystem = () =>
    unitSystem == "metric"
      ? setUnitSystem("imperial")
      : setUnitSystem("metric");
  if (error) {
    return (
      <ErrorScreen errorMessage="Impossible de charger les données météo. Vérifiez la connexion réseau." />
    );
  }

  if (!weatherData) {
    return <LoadingScreen loadingMessage="Chargement des données météo..." />;
  }

  return (
    <div className={styles.wrapper}>
      <MainCard
        city={weatherData.name}
        country={weatherData.sys.country}
        description={weatherData.weather[0].description}
        iconName={weatherData.weather[0].icon}
        unitSystem={unitSystem}
        weatherData={weatherData}
      />
      <ContentBox>
        <Header>
          <DateAndTime weatherData={weatherData} unitSystem={unitSystem} />
        </Header>
        <MetricsBox weatherData={weatherData} unitSystem={unitSystem} />
        <UnitSwitch onClick={changeSystem} unitSystem={unitSystem} />
      </ContentBox>
    </div>
  );
};

export default App;
