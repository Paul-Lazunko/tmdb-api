import { THttpSchema } from '../../constants';

export interface HttpServerOptions {
  schema: THttpSchema,
  host: string,
  port: number,
  apiVersion: string,
  name: string,
  description: string,
  outerHost?: string,
}
