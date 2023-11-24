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
  Person,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferPersonController {
  constructor(
    @repository(OfferRepository)
    public offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/applicant', {
    responses: {
      '200': {
        description: 'Person belonging to Offer',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Person),
          },
        },
      },
    },
  })
  async getApplicant(
    @param.path.number('id') id: typeof Offer.prototype.id,
  ): Promise<Person> {
    return this.offerRepository.applicant(id);
  }

  @get('/offers/{id}/tenderOwner', {
    responses: {
      '200': {
        description: 'Person belonging to Offer',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Person),
          },
        },
      },
    },
  })
  async getTenderOwner(
    @param.path.number('id') id: typeof Offer.prototype.id,
  ): Promise<Person> {
    return this.offerRepository.tenderOwner(id);
  }
}
