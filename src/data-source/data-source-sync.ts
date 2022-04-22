import { EventEmitter } from 'events';

import {
  SYNC_EVENT_NAME,
  SYNC_TIMEOUT,
  TARGET_MOVIES,
  TARGET_PERSONS
} from '../constants';

import { dataSourceController } from '../controllers';

export class DataSourceSync {
  private eventEmitter: EventEmitter;
  private timeOut: NodeJS.Timeout

  constructor() {
    this.eventEmitter = new EventEmitter();
    this.init();
  }

  private init() {
    this.eventEmitter.on(SYNC_EVENT_NAME, async() => {
      try {
        await dataSourceController.init(TARGET_MOVIES, TARGET_PERSONS);
      } catch (e) {
        console.log(`Can\'t synchronize with The Movie DB: ${e.message}`)
      }
      this.timeOut = setTimeout(() => {
        this.eventEmitter.emit(SYNC_EVENT_NAME);
      }, SYNC_TIMEOUT)
    })
  }

  public start() {
    this.timeOut = setTimeout(() => {
      this.eventEmitter.emit(SYNC_EVENT_NAME);
    }, SYNC_TIMEOUT)
  }

  public stop() {
    if ( this.timeOut ) {
      clearTimeout(this.timeOut);
    }
    this.eventEmitter.removeAllListeners(SYNC_EVENT_NAME);
  }

}
