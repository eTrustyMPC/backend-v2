import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Organization,
  Person,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonOrganizationController {
  constructor(
    @repository(PersonRepository)
    public personRepository: PersonRepository,
  ) { }

  @get('/persons/{id}/organization', {
    tags: ['PersonController'],
    responses: {
      '200': {
        description: 'Organization belonging to Person',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Organization),
          },
        },
      },
    },
  })
  async getOrganization(
    @param.path.number('id') id: typeof Person.prototype.id,
  ): Promise<Organization> {
    return this.personRepository.organization(id);
  }
}
