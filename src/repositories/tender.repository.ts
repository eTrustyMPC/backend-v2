import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, ReferencesManyAccessor, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tender, TenderRelations, User, Organization} from '../models';
import {UserRepository} from './user.repository';
import {OrganizationRepository} from './organization.repository';

export class TenderRepository extends DefaultCrudRepository<
  Tender,
  typeof Tender.prototype.id,
  TenderRelations
> {

  public readonly owner: BelongsToAccessor<User, typeof Tender.prototype.id>;

  public readonly juryMembers: ReferencesManyAccessor<User, typeof Tender.prototype.id>;

  public readonly organization: BelongsToAccessor<Organization, typeof Tender.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
    @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('OrganizationRepository') protected organizationRepositoryGetter: Getter<OrganizationRepository>,
  ) {
    super(Tender, dataSource);
    this.organization = this.createBelongsToAccessorFor('organization', organizationRepositoryGetter,);
    this.registerInclusionResolver('organization', this.organization.inclusionResolver);
    this.juryMembers = this.createReferencesManyAccessorFor('juryMembers', userRepositoryGetter,);
    this.registerInclusionResolver('juryMembers', this.juryMembers.inclusionResolver);
    this.owner = this.createBelongsToAccessorFor('owner', userRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
  }
}
