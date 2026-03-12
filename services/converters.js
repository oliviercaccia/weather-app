export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToMiles = (km) => (km / 1.609).toFixed(1);

export const timeTo12HourFormat = (time) => {
  let [hours, minutes] = time.split(":");
  return `${(hours %= 12) ? hours : 12}:${minutes}`;
};

export const degToCompass = (num) => {
  var val = Math.round(num / 22.5);
  var arr = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
  return arr[val % 16];
};

export const unixToLocalTime = (unixSeconds, timezone) => {
  const localDate = new Date((unixSeconds + timezone) * 1000);
  const hours = localDate.getUTCHours();
  const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
