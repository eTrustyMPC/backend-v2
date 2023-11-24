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
  Person,
} from '../models';
import {LotRepository} from '../repositories';

export class LotPersonController {
  constructor(
    @repository(LotRepository)
    public lotRepository: LotRepository,
  ) { }

  @get('/lots/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Lot',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Person),
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.number('id') id: typeof Lot.prototype.id,
  ): Promise<Person> {
    return this.lotRepository.owner(id);
  }
}
