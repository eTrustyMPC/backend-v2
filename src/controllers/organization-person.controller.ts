import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Organization,
  Person,
} from '../models';
import {OrganizationRepository} from '../repositories';

export class OrganizationPersonController {
  constructor(
    @repository(OrganizationRepository)
    public organizationRepository: OrganizationRepository,
  ) { }

  @get('/organizations/{id}/person', {
    responses: {
      '200': {
        description: 'Person belonging to Organization',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Person),
          },
        },
      },
    },
  })
  async getPerson(
    @param.path.number('id') id: typeof Organization.prototype.id,
  ): Promise<Person> {
    return this.organizationRepository.owner(id);
  }
}
