import { defineFunction } from '@aws-amplify/backend';

export const getWeather = defineFunction({
  // optionally specify a name for the Function (defaults to directory name)
  name: 'get-weather',
  // optionally specify a path to your handler (defaults to "./handler.ts")
  entry: './handler.ts',
});
