import express, { Application } from 'express'
import helmet from 'helmet';
import { ExpressApplicationOptions } from '../../contracts';
import {
  corsHandler,
  errorHandler,
  getSwaggerMiddlewares,
  notFoundHandler,
} from '../../middlewares';
import { loadRoutes } from './loadRoutes';

export function getExpressApplicationHelper(config: ExpressApplicationOptions, enableSwagger: boolean): Application {
  const { httpServerConfig, routesPath, routers } = config;
  const app: Application = express();
  app.use(helmet());
  app.use(corsHandler);
  loadRoutes(app, routers);
  if ( enableSwagger ) {
    const swaggerHandlers = getSwaggerMiddlewares(httpServerConfig, routesPath);
    app.use('/swagger', ...swaggerHandlers);
  }
  app.use(errorHandler);
  app.use(notFoundHandler);
  return app;
}
