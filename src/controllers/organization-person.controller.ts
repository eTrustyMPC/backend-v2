import {
  Filter,
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import {
  Organization,
  Person
} from '../models';
import {
  OrganizationRepository,
} from '../repositories';

export class OrganizationPersonController {
  constructor(
    @repository(OrganizationRepository) public organizationRepository: OrganizationRepository,
    //@repository(PersonRepository) public personRepository: PersonRepository,
  ) { }

  @get('/organizations/{id}/owner', {
    tags: ['OrganizationController'],
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
  async getOwner(
    @param.path.number('id') id: typeof Organization.prototype.id,
  ): Promise<Person> {
    return this.organizationRepository.owner(id);
  }

  @get('/organizations/{id}/members', {
    tags: ['OrganizationController'],
    responses: {
      '200': {
        description: 'Members of this Organization',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Person)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Person>,
  ): Promise<Person[]> {
    return this.organizationRepository.persons(id).find(filter);
  }
}
