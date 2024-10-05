import { secret } from '@aws-amplify/backend';
import { Schema } from '../../data/resource';

export const handler: Schema['getWeather']['functionHandler'] = async (
  event,
  context
) => {
  // your function code goes here
  const WEATHER_API_KEY = secret('WEATHER_API_KEY');

  if (WEATHER_API_KEY) {
    console.log('has key');

    const { date } = event.arguments;

    const weatherDataResponse = await fetch(
      `https://api.weatherapi.com/v1/future.json?key=${WEATHER_API_KEY}&q="London,UK"&dt=${date}`
    );
    const weatherData = await weatherDataResponse.json();

    return weatherData?.forecast?.forecastday[0]?.condition?.text || 'unknown';
  }
  return 'No key';
};
