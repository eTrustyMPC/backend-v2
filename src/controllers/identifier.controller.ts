import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { Identifier } from '../models';
import { IdentifierRepository } from '../repositories';

@authenticate('jwt')
export class IdentifierController {
  constructor(
    @repository(IdentifierRepository)
    public identifierRepository: IdentifierRepository,
  ) { }

  @post('/identifiers')
  @response(200, {
    description: 'Identifier model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Identifier) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Identifier, {
            title: 'NewIdentifier',
            exclude: ['id'],
          }),
        },
      },
    })
    identifier: Omit<Identifier, 'id'>,
  ): Promise<Identifier> {
    return this.identifierRepository.create(identifier);
  }

  @get('/identifiers/count')
  @response(200, {
    description: 'Identifier model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Identifier) where?: Where<Identifier>,
  ): Promise<Count> {
    return this.identifierRepository.count(where);
  }

  @get('/identifiers')
  @response(200, {
    description: 'Array of Identifier model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Identifier, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Identifier) filter?: Filter<Identifier>,
  ): Promise<Identifier[]> {
    return this.identifierRepository.find(filter);
  }

  @patch('/identifiers')
  @response(200, {
    description: 'Identifier PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Identifier, { partial: true }),
        },
      },
    })
    identifier: Identifier,
    @param.where(Identifier) where?: Where<Identifier>,
  ): Promise<Count> {
    return this.identifierRepository.updateAll(identifier, where);
  }

  @get('/identifiers/{id}')
  @response(200, {
    description: 'Identifier model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Identifier, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Identifier, { exclude: 'where' }) filter?: FilterExcludingWhere<Identifier>
  ): Promise<Identifier> {
    return this.identifierRepository.findById(id, filter);
  }

  @patch('/identifiers/{id}')
  @response(204, {
    description: 'Identifier PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Identifier, { partial: true }),
        },
      },
    })
    identifier: Identifier,
  ): Promise<void> {
    await this.identifierRepository.updateById(id, identifier);
  }

  @put('/identifiers/{id}')
  @response(204, {
    description: 'Identifier PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() identifier: Identifier,
  ): Promise<void> {
    await this.identifierRepository.replaceById(id, identifier);
  }

  @del('/identifiers/{id}')
  @response(204, {
    description: 'Identifier DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.identifierRepository.deleteById(id);
  }
}
