import { Application, Router } from 'express';

export function loadRoutes(app: Application, routers: { [key: string]: Router }): void {
  for ( const routerName in routers ) {
    app.use(routers[routerName]);
  }
}
