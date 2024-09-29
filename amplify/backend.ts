import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource.js';
import { data } from './data/resource.js';
import { getWeather } from './functions/get-weather/resource';

defineBackend({
  auth,
  data,
  getWeather,
});
