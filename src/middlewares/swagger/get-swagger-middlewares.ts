import * as swaggerUiExpress from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { getSwaggerDefinitions } from './get-swagger-definitions';
import { HttpServerOptions } from '../../contracts';


export function getSwaggerMiddlewares(server: HttpServerOptions, routesPath: string): any[] {
  const swaggerSpec = swaggerJsdoc({
    swaggerDefinition: getSwaggerDefinitions(server),
    apis: [ routesPath ]
  });
  return [swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec)];
}
