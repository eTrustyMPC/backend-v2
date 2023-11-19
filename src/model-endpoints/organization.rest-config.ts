import {ModelCrudRestApiConfig} from '@loopback/rest-crud';
import {Organization} from '../models';

const config: ModelCrudRestApiConfig = {
  model: Organization,
  pattern: 'CrudRest',
  dataSource: 'db',
  basePath: '/organizations',
  readonly: false,
};
module.exports = config;
