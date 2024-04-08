import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Release, ReleaseRelations} from '../models';

export class ReleaseRepository extends DefaultCrudRepository<
  Release,
  typeof Release.prototype.id,
  ReleaseRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Release, dataSource);
  }
}
