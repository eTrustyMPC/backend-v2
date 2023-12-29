import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Review,
  Tender,
} from '../models';
import {ReviewRepository} from '../repositories';

export class ReviewTenderController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) { }

  @get('/reviews/{id}/tender', {
    tags: ['ReviewController'],
    responses: {
      '200': {
        description: 'Tender belonging to Review',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tender),
          },
        },
      },
    },
  })
  async getTender(
    @param.path.number('id') id: typeof Review.prototype.id,
  ): Promise<Tender> {
    return this.reviewRepository.tender(id);
  }
}
