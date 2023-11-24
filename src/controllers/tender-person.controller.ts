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
  Person,
} from '../models';
import {TenderRepository} from '../repositories';

export class TenderPersonController {
  constructor(
    @repository(TenderRepository)
    public tenderRepository: TenderRepository,
  ) { }

  @get('/tenders/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Tender',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Person),
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.number('id') id: typeof Tender.prototype.id,
  ): Promise<Person> {
    return this.tenderRepository.owner(id);
  }
}
