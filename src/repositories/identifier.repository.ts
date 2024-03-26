import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Identifier, IdentifierRelations } from '../models';

export class IdentifierRepository extends DefaultCrudRepository<
  Identifier,
  typeof Identifier.prototype.id,
  IdentifierRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Identifier, dataSource);
  }
}
