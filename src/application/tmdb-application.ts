import { Server } from 'http';
import { Application } from 'express';
import { dataSourceController } from '../controllers';
import { TARGET_MOVIES, TARGET_PERSONS } from '../constants';
import { getExpressApplicationHelper} from '../helpers';
import { httpServerConfig } from '../configs';
import * as routers from '../routes';
import { DataSourceSync } from '../data-source';

export class TMDBApplication {
  public app: Application;
  protected server: Server;
  protected dataSourceSync: DataSourceSync;

  public async start(){
    try {
      await dataSourceController.init(TARGET_MOVIES, TARGET_PERSONS);
    } catch(e) {
      console.log(`Can't fetch The Movie DB: ${e.message}`);
      process.exit(1);
    }
    this.dataSourceSync = new DataSourceSync();
    this.app = getExpressApplicationHelper({
        httpServerConfig,
        routers,
        routesPath: `dist/routes/*.js`
      }, true);
    this.server = this.app.listen(httpServerConfig.port, () => {
      console.log(`\x1b[34m ${httpServerConfig.name} was started at ${httpServerConfig.port} port \x1b[0m`);
    });
    this.dataSourceSync.start();
  }

  public async stop() {
    try {
      this.dataSourceSync.stop();
      this.server.close();
    } catch (e) {
      console.log(e.message);
    }
  }

}

export const application = new TMDBApplication();
