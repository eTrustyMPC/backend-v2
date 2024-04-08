import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {OrganizationReference, OrganizationReferenceRelations} from '../models';

export class OrganizationReferenceRepository extends DefaultCrudRepository<
  OrganizationReference,
  typeof OrganizationReference.prototype.id,
  OrganizationReferenceRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(OrganizationReference, dataSource);
  }
}
