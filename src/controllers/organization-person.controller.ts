import {
  Count,
  CountSchema,
  Filter,
  Where,
  repository,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
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
        description: 'Owner of this Organization',
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

  @get('/organizations/{id}/persons', {
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
  async findPerson(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Person>,
  ): Promise<Person[]> {
    return this.organizationRepository.persons(id).find(filter);
  }

  @post('/organizations/{id}/persons', {
    tags: ['OrganizationController'],
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(Person)}},
      },
    },
  })
  async createPerson(
    @param.path.number('id') id: typeof Organization.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {
            title: 'NewPersonInOrganization',
            exclude: ['id'],
            optional: ['organizationId']
          }),
        },
      },
    }) person: Omit<Person, 'id'>,
  ): Promise<Person> {
    return this.organizationRepository.persons(id).create(person);
  }

  @patch('/organizations/{id}/persons', {
    tags: ['OrganizationController'],
    responses: {
      '200': {
        description: 'Organization.person PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patchPerson(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Person, {partial: true}),
        },
      },
    })
    person: Partial<Person>,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.organizationRepository.persons(id).patch(person, where);
  }

  @del('/organizations/{id}/persons', {
    tags: ['OrganizationController'],
    responses: {
      '200': {
        description: 'Organization.persons DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deletePerson(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.organizationRepository.persons(id).delete(where);
  }
}
