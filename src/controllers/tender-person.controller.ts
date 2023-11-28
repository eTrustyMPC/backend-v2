import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Person,
  Tender,
} from '../models';
import {TenderRepository} from '../repositories';

export class TenderPersonController {
  constructor(
    @repository(TenderRepository)
    public tenderRepository: TenderRepository,
  ) { }

  @get('/tenders/{id}/owner', {
    tags: ['TenderController'],
    responses: {
      '200': {
        description: 'Tender owner',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Person),
          },
        },
      },
    },
  })
  async getOwner(
    @param.path.number('id') id: typeof Tender.prototype.id,
  ): Promise<Person> {
    return this.tenderRepository.owner(id);
  }
}
