import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
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
  Person,
} from '../models';
import {OrganizationRepository} from '../repositories';

export class OrganizationPersonController {
  constructor(
    @repository(OrganizationRepository) protected organizationRepository: OrganizationRepository,
  ) { }

  @get('/organizations/{id}/people', {
    responses: {
      '200': {
        description: 'Array of Organization has many Person',
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

  @post('/organizations/{id}/people', {
    responses: {
      '200': {
        description: 'Organization model instance',
        content: {'application/json': {schema: getModelSchemaRef(Person)}},
      },
    },
  })
  async create(
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

  @patch('/organizations/{id}/people', {
    responses: {
      '200': {
        description: 'Organization.Person PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
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

  @del('/organizations/{id}/people', {
    responses: {
      '200': {
        description: 'Organization.Person DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Person)) where?: Where<Person>,
  ): Promise<Count> {
    return this.organizationRepository.persons(id).delete(where);
  }
}
