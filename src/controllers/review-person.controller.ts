import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Person,
  Review,
} from '../models';
import {ReviewRepository} from '../repositories';

export class ReviewPersonController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) { }

  @get('/reviews/{id}/applicant', {
    tags: ['ReviewController'],
    responses: {
      '200': {
        description: 'Person belonging to Review',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Person),
          },
        },
      },
    },
  })
  async getApplicant(
    @param.path.number('id') id: typeof Review.prototype.id,
  ): Promise<Person> {
    return this.reviewRepository.applicant(id);
  }
}
