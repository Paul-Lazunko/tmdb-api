import { HttpServerOptions } from './http-server-options';

export interface ExpressApplicationOptions {
  httpServerConfig: HttpServerOptions,
  routesPath: string,
  routers: any
}
