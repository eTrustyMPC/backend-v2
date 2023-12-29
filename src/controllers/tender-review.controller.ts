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
  Review,
  Tender,
} from '../models';
import {TenderRepository} from '../repositories';

export class TenderReviewController {
  constructor(
    @repository(TenderRepository) protected tenderRepository: TenderRepository,
  ) { }

  @get('/tenders/{id}/reviews', {
    tags: ['TenderController'],
    responses: {
      '200': {
        description: 'Array of Tender has many Review',
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
    return this.tenderRepository.reviews(id).find(filter);
  }

  @post('/tenders/{id}/reviews', {
    tags: ['TenderController'],
    responses: {
      '200': {
        description: 'Tender model instance',
        content: {'application/json': {schema: getModelSchemaRef(Review)}},
      },
    },
  })
  async createReview(
    @param.path.number('id') id: typeof Tender.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Review, {
            title: 'NewReviewInTender',
            exclude: ['id'],
            optional: ['tenderId']
          }),
        },
      },
    }) review: Omit<Review, 'id'>,
  ): Promise<Review> {
    return this.tenderRepository.reviews(id).create(review);
  }

  @patch('/tenders/{id}/reviews', {
    tags: ['TenderController'],
    responses: {
      '200': {
        description: 'Tender.Review PATCH success count',
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
    return this.tenderRepository.reviews(id).patch(review, where);
  }

  @del('/tenders/{id}/reviews', {
    tags: ['TenderController'],
    responses: {
      '200': {
        description: 'Tender.Review DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteReview(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Review)) where?: Where<Review>,
  ): Promise<Count> {
    return this.tenderRepository.reviews(id).delete(where);
  }
}
