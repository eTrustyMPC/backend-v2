import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Tender,
  Lot,
} from '../models';
import {TenderRepository} from '../repositories';

export class TenderLotController {
  constructor(
    @repository(TenderRepository)
    public tenderRepository: TenderRepository,
  ) { }

  @get('/tenders/{id}/lot', {
    responses: {
      '200': {
        description: 'Lot belonging to Tender',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Lot),
          },
        },
      },
    },
  })
  async getLot(
    @param.path.number('id') id: typeof Tender.prototype.id,
  ): Promise<Lot> {
    return this.tenderRepository.lot(id);
  }
}
