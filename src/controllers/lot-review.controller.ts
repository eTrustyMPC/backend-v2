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
Offer,
Review,
} from '../models';
import {LotRepository} from '../repositories';

export class LotReviewController {
  constructor(
    @repository(LotRepository) protected lotRepository: LotRepository,
  ) { }

  @get('/lots/{id}/reviews', {
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
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Review>,
  ): Promise<Review[]> {
    return this.lotRepository.reviews(id).find(filter);
  }

  @post('/lots/{id}/reviews', {
    responses: {
      '200': {
        description: 'create a Review model instance',
        content: {'application/json': {schema: getModelSchemaRef(Review)}},
      },
    },
  })
  async create(
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
    responses: {
      '200': {
        description: 'Lot.Review PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
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
    responses: {
      '200': {
        description: 'Lot.Review DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Review)) where?: Where<Review>,
  ): Promise<Count> {
    return this.lotRepository.reviews(id).delete(where);
  }
}
