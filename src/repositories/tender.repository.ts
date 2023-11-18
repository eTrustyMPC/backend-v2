import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, ReferencesManyAccessor} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Tender, TenderRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class TenderRepository extends DefaultCrudRepository<
  Tender,
  typeof Tender.prototype.id,
  TenderRelations
> {

  public readonly owner: BelongsToAccessor<User, typeof Tender.prototype.id>;

  public readonly juryMembers: ReferencesManyAccessor<User, typeof Tender.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Tender, dataSource);
    this.juryMembers = this.createReferencesManyAccessorFor('juryMembers', userRepositoryGetter,);
    this.registerInclusionResolver('juryMembers', this.juryMembers.inclusionResolver);
    this.owner = this.createBelongsToAccessorFor('owner', userRepositoryGetter,);
    this.registerInclusionResolver('owner', this.owner.inclusionResolver);
  }
}
