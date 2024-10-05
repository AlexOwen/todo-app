import { Schema } from '../../data/resource';
const { SSMClient, GetParametersCommand } = require('@aws-sdk/client-ssm');

const client = new SSMClient();

export const handler: Schema['getWeather']['functionHandler'] = async (
  event,
  _context
) => {
  // your function code goes here

  const command = new GetParametersCommand({
    Names: process.env['WEATHER_API_KEY'],
    WithDecryption: true,
  });

  let weatherApiKey;

  try {
    const { Parameters } = await client.send(command);

    console.log(Parameters);

    weatherApiKey = Parameters['WEATHER_API_KEY'];
  } catch (err) {
    console.error(err);
  }

  if (weatherApiKey) {
    console.log('has key');

    const { date } = event.arguments;

    const weatherDataResponse = await fetch(
      `https://api.weatherapi.com/v1/future.json?key=${weatherApiKey}&q="London,UK"&dt=${date}`
    );
    const weatherData = await weatherDataResponse.json();

    return weatherData?.forecast?.forecastday[0]?.condition?.text || 'unknown';
  }

  return 'No key';
};
