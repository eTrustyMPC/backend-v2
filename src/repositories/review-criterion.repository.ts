import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {ReviewCriterion, ReviewCriterionRelations} from '../models';

export class ReviewCriterionRepository extends DefaultCrudRepository<
  ReviewCriterion,
  typeof ReviewCriterion.prototype.id,
  ReviewCriterionRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(ReviewCriterion, dataSource);
  }
}
