import fetch from 'node-fetch';
import {
  ClientBuilder,
  type AnonymousAuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import { sportStore } from '../data/api-clients';

const options: AnonymousAuthMiddlewareOptions = {
  host: sportStore.AuthURL,
  projectKey: sportStore.projectKey,
  credentials: {
    clientId: sportStore.clientId,
    clientSecret: sportStore.secret,
  },
  fetch,
};

const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: sportStore.APIURL,
  fetch,
};

const ctpClient = new ClientBuilder()
  .withAnonymousSessionFlow(options)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export default ctpClient;
