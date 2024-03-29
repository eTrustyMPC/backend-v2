import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Package, PackageRelations} from '../models';

export class PackageRepository extends DefaultCrudRepository<
  Package,
  typeof Package.prototype.id,
  PackageRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Package, dataSource);
  }
}
