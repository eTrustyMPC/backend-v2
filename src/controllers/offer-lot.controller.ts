import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Offer,
  Lot,
} from '../models';
import {OfferRepository} from '../repositories';

export class OfferLotController {
  constructor(
    @repository(OfferRepository)
    public offerRepository: OfferRepository,
  ) { }

  @get('/offers/{id}/lot', {
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
