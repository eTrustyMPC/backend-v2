import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Lot,
  Tender,
} from '../models';
import {LotRepository} from '../repositories';

export class LotTenderController {
  constructor(
    @repository(LotRepository)
    public lotRepository: LotRepository,
  ) { }

  @get('/lots/{id}/tender', {
    responses: {
      '200': {
        description: 'Tender belonging to Lot',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Tender),
          },
        },
      },
    },
  })
  async getTender(
    @param.path.number('id') id: typeof Lot.prototype.id,
  ): Promise<Tender> {
    return this.lotRepository.tender(id);
  }
}
