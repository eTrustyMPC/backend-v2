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
  Tender,
} from '../models';
import {TenderRepository} from '../repositories';


export class TenderOrganizationController {
  constructor(
    @repository(TenderRepository)
    public tenderRepository: TenderRepository,
  ) { }

  @get('/tenders/{id}/organization', {
    tags: ['TenderController'],
    responses: {
      '200': {
        description: 'Organization belonging to Tender',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Organization),
          },
        },
      },
    },
  })
  async getOrganization(
    @param.path.number('id') id: typeof Tender.prototype.id,
  ): Promise<Organization> {
    return this.tenderRepository.organization(id);
  }
}
