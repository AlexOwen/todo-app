import { generateClient } from 'aws-amplify/api';
import { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export type Weather = {
  temp_c: number | null;
  text: string | null;
};

const weatherData = new Map<string, Weather>();

export const getWeather = async (date: string): Promise<Weather> => {
  if (weatherData.get(date)) {
    console.log('Hit cache', date);
    return weatherData.get(date) as Weather;
  }

  const res = await client.queries.getWeather({
    date: date,
  });

  // TODO: fix this return type
  // TODO: catch parsing errors
  const weather = res.data ? (JSON.parse(res.data as string) as Weather) : null;

  if (weather) {
    weatherData.set(date, weather);
    return weather;
  }

  return {
    temp_c: null,
    text: null,
  };
};
