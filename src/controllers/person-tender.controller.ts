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
  Person,
  Tender,
} from '../models';
import {PersonRepository} from '../repositories';

export class PersonTenderController {
  constructor(
    @repository(PersonRepository) protected personRepository: PersonRepository,
  ) { }

  @get('/people/{id}/tenders', {
    responses: {
      '200': {
        description: 'Array of Person has many Tender',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Tender)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Tender>,
  ): Promise<Tender[]> {
    return this.personRepository.tendersOwned(id).find(filter);
  }

  @post('/people/{id}/tenders', {
    responses: {
      '200': {
        description: 'Person model instance',
        content: {'application/json': {schema: getModelSchemaRef(Tender)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Person.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tender, {
            title: 'NewTenderInPerson',
            exclude: ['id'],
            optional: ['ownerId']
          }),
        },
      },
    }) tender: Omit<Tender, 'id'>,
  ): Promise<Tender> {
    return this.personRepository.tendersOwned(id).create(tender);
  }

  @patch('/people/{id}/tenders', {
    responses: {
      '200': {
        description: 'Person.Tender PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tender, {partial: true}),
        },
      },
    })
    tender: Partial<Tender>,
    @param.query.object('where', getWhereSchemaFor(Tender)) where?: Where<Tender>,
  ): Promise<Count> {
    return this.personRepository.tendersOwned(id).patch(tender, where);
  }

  @del('/people/{id}/tenders', {
    responses: {
      '200': {
        description: 'Person.Tender DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Tender)) where?: Where<Tender>,
  ): Promise<Count> {
    return this.personRepository.tendersOwned(id).delete(where);
  }
}
