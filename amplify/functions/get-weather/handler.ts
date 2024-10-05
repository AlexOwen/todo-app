import { Schema } from '../../data/resource';
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');

const client = new SSMClient();

export const handler: Schema['getWeather']['functionHandler'] = async (
  event,
  _context
): Promise<object | null> => {
  // TODO: fetch this dynamically
  const command = new GetParameterCommand({
    Name: '/amplify/shared/d25wxl7g3670d/WEATHER_API_KEY',
    WithDecryption: true,
  });

  let weatherApiKey;

  try {
    const { Parameter } = await client.send(command);

    weatherApiKey = Parameter.Value;
  } catch (err) {
    console.error(err);
  }

  if (weatherApiKey) {
    const { date } = event.arguments;

    const weatherDataResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q="London,UK"&dt=${date}`
    );

    const weatherData = await weatherDataResponse.json();

    if (weatherData?.forecast?.forecastday?.length) {
      const dayData = weatherData?.forecast?.forecastday?.find(
        (d: { date: string }) => d.date === date
      );
      if (dayData) {
        return {
          temp_c: dayData.avgtemp_c,
          text: dayData.condition.text,
        };
      }
    }
  }

  return null;
};
