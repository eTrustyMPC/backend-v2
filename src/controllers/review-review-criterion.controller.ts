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
  ReviewCriterion,
} from '../models';
import {ReviewRepository} from '../repositories';

export class ReviewReviewCriterionController {
  constructor(
    @repository(ReviewRepository) protected reviewRepository: ReviewRepository,
  ) { }

  @get('/reviews/{id}/review-criterion', {
    tags: ['ReviewController'],
    responses: {
      '200': {
        description: 'Review has one ReviewCriterion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ReviewCriterion),
          },
        },
      },
    },
  })
  async getReviewCriterion(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ReviewCriterion>,
  ): Promise<ReviewCriterion> {
    return this.reviewRepository.reviewCriterion(id).get(filter);
  }

  @post('/reviews/{id}/review-criterion', {
    tags: ['ReviewController'],
    responses: {
      '200': {
        description: 'Review model instance',
        content: {'application/json': {schema: getModelSchemaRef(ReviewCriterion)}},
      },
    },
  })
  async createReviewCriterion(
    @param.path.number('id') id: typeof Review.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReviewCriterion, {
            title: 'NewReviewCriterionInReview',
            exclude: ['id'],
            optional: ['reviewId']
          }),
        },
      },
    }) reviewCriterion: Omit<ReviewCriterion, 'id'>,
  ): Promise<ReviewCriterion> {
    return this.reviewRepository.reviewCriterion(id).create(reviewCriterion);
  }

  @patch('/reviews/{id}/review-criterion', {
    tags: ['ReviewController'],
    responses: {
      '200': {
        description: 'Review.ReviewCriterion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchReviewCriterion(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReviewCriterion, {partial: true}),
        },
      },
    })
    reviewCriterion: Partial<ReviewCriterion>,
    @param.query.object('where', getWhereSchemaFor(ReviewCriterion)) where?: Where<ReviewCriterion>,
  ): Promise<Count> {
    return this.reviewRepository.reviewCriterion(id).patch(reviewCriterion, where);
  }

  @del('/reviews/{id}/review-criterion', {
    tags: ['ReviewController'],
    responses: {
      '200': {
        description: 'Review.ReviewCriterion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deleteReviewCriterion(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ReviewCriterion)) where?: Where<ReviewCriterion>,
  ): Promise<Count> {
    return this.reviewRepository.reviewCriterion(id).delete(where);
  }
}
