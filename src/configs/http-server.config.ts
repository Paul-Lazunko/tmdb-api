import { HttpServerOptions } from '../contracts';
import { THttpSchema } from '../constants';

export const httpServerConfig: HttpServerOptions = {
  schema: 'http' as THttpSchema,
  host: 'localhost',
  port: 3000,
  name: 'The Movie DB Application',
  description: 'test task',
  apiVersion: 'v1',
}
