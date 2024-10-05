import { Schema } from '../../data/resource';
const { SSMClient, GetParameterCommand } = require('@aws-sdk/client-ssm');

const client = new SSMClient();

export const handler: Schema['getWeather']['functionHandler'] = async (
  event,
  _context
): Promise<string | null> => {
  // your function code goes here
  console.log(JSON.stringify(process.env));

  const command = new GetParameterCommand({
    Name: process.env['WEATHER_API_KEY'],
    WithDecryption: true,
  });

  let weatherApiKey;

  try {
    const { Parameter } = await client.send(command);

    console.log(Parameter);

    weatherApiKey = Parameter.Value;
  } catch (err) {
    console.error(err);
  }

  if (weatherApiKey) {
    console.log('has key');

    const { date } = event.arguments;

    const weatherDataResponse = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q="London,UK"&dt=${date}`
    );
    const weatherData = await weatherDataResponse.json();

    if (weatherData?.forecast?.forecastday[0]) {
      return JSON.stringify({
        temp_c: weatherData?.current?.condition?.temp_c,
        text: weatherData?.current?.condition?.text,
      });
    }
  }

  return null;
};
