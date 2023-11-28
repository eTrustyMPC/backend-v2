import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Lot,
  Review
} from '../models';
import {LotRepository} from '../repositories';

export class LotReviewController {
  constructor(
    @repository(LotRepository) protected lotRepository: LotRepository,
  ) { }

  @get('/lots/{id}/reviews', {
    tags: ['LotController'],
    responses: {
      '200': {
        description: 'Array of Lot has many Review through Offer',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Review)},
          },
        },
      },
    },
  })
  async findReview(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Review>,
  ): Promise<Review[]> {
    return this.lotRepository.reviews(id).find(filter);
  }

  @post('/lots/{id}/reviews', {
    tags: ['LotController'],
    responses: {
      '200': {
        description: 'create a Review model instance',
        content: {'application/json': {schema: getModelSchemaRef(Review)}},
      },
    },
  })
  async createReview(
    @param.path.number('id') id: typeof Lot.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {
            title: 'NewReviewInLot',
            exclude: ['id'],
          }),
        },
      },
    }) review: Omit<Review, 'id'>,
  ): Promise<Review> {
    return this.lotRepository.reviews(id).create(review);
  }

  @patch('/lots/{id}/reviews', {
    tags: ['LotController'],
    responses: {
      '200': {
        description: 'Lot.Review PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchReview(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {partial: true}),
        },
      },
    })
    review: Partial<Review>,
    @param.query.object('where', getWhereSchemaFor(Review)) where?: Where<Review>,
  ): Promise<Count> {
    return this.lotRepository.reviews(id).patch(review, where);
  }

  @del('/lots/{id}/reviews', {
    tags: ['LotController'],
    responses: {
      '200': {
        description: 'Lot.Review DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteReviews(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Review)) where?: Where<Review>,
  ): Promise<Count> {
    return this.lotRepository.reviews(id).delete(where);
  }
}
