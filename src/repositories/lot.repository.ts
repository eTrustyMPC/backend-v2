import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Lot, LotRelations} from '../models';

export class LotRepository extends DefaultCrudRepository<
  Lot,
  typeof Lot.prototype.id,
  LotRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Lot, dataSource);
  }
}
