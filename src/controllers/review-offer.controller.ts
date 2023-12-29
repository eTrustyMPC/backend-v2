import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Offer,
  Review,
} from '../models';
import {ReviewRepository} from '../repositories';

export class ReviewOfferController {
  constructor(
    @repository(ReviewRepository)
    public reviewRepository: ReviewRepository,
  ) { }

  @get('/reviews/{id}/offer', {
    tags: ['ReviewController'],
    responses: {
      '200': {
        description: 'Offer belonging to Review',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Offer),
          },
        },
      },
    },
  })
  async getOffer(
    @param.path.number('id') id: typeof Review.prototype.id,
  ): Promise<Offer> {
    return this.reviewRepository.offer(id);
  }
}
