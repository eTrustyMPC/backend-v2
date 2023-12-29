import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Lot,
  Offer,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferLotController {
  constructor(
    @repository(OfferRepository) public offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/lot', {
    tags: ['OfferController'],
    responses: {
      '200': {
        description: 'Lot belonging to Offer',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Lot),
          },
        },
      },
    },
  })
  async getLot(
    @param.path.number('id') id: typeof Offer.prototype.id,
  ): Promise<Lot> {
    return this.offerRepository.lot(id);
  }
}
