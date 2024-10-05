import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { getWeather } from '../functions/get-weather/resource';

const schema = a.schema({
  Todo: a
    .model({
      name: a.string().default(''),
      isDone: a.boolean().default(false),
      dueDate: a.date().default(new Date().toISOString().split('T')[0]),
      note: a.string().default(''),
      owner: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  getWeather: a
    .query()
    .arguments({
      date: a.string(),
    })
    .returns(a.json())
    .handler(a.handler.function(getWeather))
    .authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
