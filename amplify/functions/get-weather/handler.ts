import { Schema } from '../../data/resource';

export const handler: Schema['getWeather']['functionHandler'] = async (
  event,
  context
) => {
  // your function code goes here
  console.log('Hello');
  console.log(JSON.parse(process.env.secrets || 'null'));
  return 'Hello, World!';
};
