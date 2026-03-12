import { degToCompass } from "../services/converters";
import {
  getTime,
  getAMPM,
  getVisibility,
  getWindSpeed,
} from "../services/helpers";
import { MetricsCard } from "./MetricsCard";
import styles from "./MetricsBox.module.css";

export const MetricsBox = ({ weatherData, unitSystem }) => {
  return (
    <div className={styles.wrapper}>
      <MetricsCard
        title={"Humidité"}
        iconSrc={"/icons/humidity.png"}
        metric={weatherData.main.humidity}
        unit={"%"}
      />
      <MetricsCard
        title={"Vitesse du vent"}
        iconSrc={"/icons/wind.png"}
        metric={getWindSpeed(unitSystem, weatherData.wind.speed)}
        unit={unitSystem == "metric" ? "m/s" : "m/h"}
      />
      <MetricsCard
        title={"Direction du vent"}
        iconSrc={"/icons/compass.png"}
        metric={degToCompass(weatherData.wind.deg)}
      />
      <MetricsCard
        title={"Visibilité"}
        iconSrc={"/icons/binocular.png"}
        metric={getVisibility(unitSystem, weatherData.visibility)}
        unit={unitSystem == "metric" ? "km" : "miles"}
      />
      <MetricsCard
        title={"lever"}
        iconSrc={"/icons/sunrise.png"}
        metric={getTime(
          unitSystem,
          weatherData.sys.sunrise,
          weatherData.timezone,
        )}
        unit={getAMPM(
          unitSystem,
          weatherData.sys.sunrise,
          weatherData.timezone,
        )}
      />
      <MetricsCard
        title={"coucher"}
        iconSrc={"/icons/sunset.png"}
        metric={getTime(
          unitSystem,
          weatherData.sys.sunset,
          weatherData.timezone,
        )}
        unit={getAMPM(unitSystem, weatherData.sys.sunset, weatherData.timezone)}
      />
    </div>
  );
};
