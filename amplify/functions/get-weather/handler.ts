import { Schema } from '../../data/resource';
const { SSMClient, GetParametersCommand } = require('@aws-sdk/client-ssm');

const client = new SSMClient();

export const handler: Schema['getWeather']['functionHandler'] = async (
  event,
  context
) => {
  // your function code goes here

  const command = new GetParametersCommand({
    Names: process.env['WEATHER_API_KEY'],
    WithDecryption: true,
  });

  try {
    const { Parameters } = await client.send(command);

    console.log(Parameters);
  } catch (err) {
    console.error(err);
  }

  if (false /*WEATHER_API_KEY*/) {
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
