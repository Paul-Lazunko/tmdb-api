import { THttpSchema } from '../../constants';

export interface SwaggerDefinitionsOptions {
  schema: THttpSchema,
  host: string,
  port: number,
  apiVersion: string,
  name: string,
  description: string,
}
