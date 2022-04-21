import { SwaggerDefinitionsOptions } from '../../contracts';

export function getSwaggerDefinitions(server: SwaggerDefinitionsOptions): any  {
  return {
    info: {
      title: server.name,
      version: server.apiVersion,
      description: server.description
    },
    schemas: [server.schema],
    host: `${server.host}:${server.port}`,
    basePath: '/',
    authAction: {
    }
  }
}
