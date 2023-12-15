import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';
import {config as dotenv_config} from "dotenv";
dotenv_config();

const config = {
  name: 'memory',
  connector: 'memory',
  localStorage: '',
  file: '',
};

@lifeCycleObserver('datasource')
export class MemoryDataSource
  extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'memory';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.memory', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
