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
  Tender,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferTenderController {
  constructor(
    @repository(OfferRepository)
    public offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/tender', {
    tags: ['OfferController'],
    responses: {
      '200': {
        description: 'Tender belonging to Offer',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tender),
          },
        },
      },
    },
  })
  async getTender(
    @param.path.number('id') id: typeof Offer.prototype.id,
  ): Promise<Tender> {
    return this.offerRepository.tender(id);
  }
}
