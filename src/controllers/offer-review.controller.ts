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
  Offer,
  Review,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferReviewController {
  constructor(
    @repository(OfferRepository) protected offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/reviews', {
    tags: ['OfferController'],
    responses: {
      '200': {
        description: 'Array of Offer has many Review',
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
    return this.offerRepository.reviews(id).find(filter);
  }

  @post('/offers/{id}/reviews', {
    tags: ['OfferController'],
    responses: {
      '200': {
        description: 'Offer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Review)}},
      },
    },
  })
  async createReview(
    @param.path.number('id') id: typeof Offer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {
            title: 'NewReviewInOffer',
            exclude: ['id'],
            optional: ['offerId']
          }),
        },
      },
    }) review: Omit<Review, 'id'>,
  ): Promise<Review> {
    return this.offerRepository.reviews(id).create(review);
  }

  @patch('/offers/{id}/reviews', {
    tags: ['OfferController'],
    responses: {
      '200': {
        description: 'Offer.Review PATCH success count',
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
    return this.offerRepository.reviews(id).patch(review, where);
  }

  @del('/offers/{id}/reviews', {
    tags: ['OfferController'],
    responses: {
      '200': {
        description: 'Offer.Review DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteReview(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Review)) where?: Where<Review>,
  ): Promise<Count> {
    return this.offerRepository.reviews(id).delete(where);
  }
}
