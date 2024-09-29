import { Schema } from '../../data/resource';

export const handler: Schema['getWeather']['functionHandler'] = async (
  event,
  context
) => {
  // your function code goes here
  const { WEATHER_API_KEY } = JSON.parse(process.env.secrets || '{}');

  if (WEATHER_API_KEY) {
    console.log('has key');

    const { date } = event.arguments;

    const weatherDataResponse = await fetch({
      url: `https://api.weatherapi.com/v1/`,
      method: 'POST',
      body: JSON.stringify({
        key: WEATHER_API_KEY,
        q: 'London, UK',
        dt: date,
      }),
    });
    const weatherData = await weatherDataResponse.json();

    return weatherData?.forecast?.forecastday[0]?.condition?.text || 'unknown';
  }
  return 'No key';
};
