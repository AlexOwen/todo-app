import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { getWeather } from '../functions/get-weather/resource';
const schema = a.schema({
  Todo: a
    .model({
      name: a.string(),
      isDone: a.boolean(),
      dueDate: a.date(),
      note: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  getWeather: a
    .query()
    .arguments({
      date: a.string(),
    })
    .returns(a.string())
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
