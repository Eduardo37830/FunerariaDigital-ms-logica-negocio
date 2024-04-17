import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Conductor,
  Sede,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorSedeController {
  constructor(
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/sede', {
    responses: {
      '200': {
        description: 'Sede belonging to Conductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sede),
          },
        },
      },
    },
  })
  async getSede(
    @param.path.number('id') id: typeof Conductor.prototype.id,
  ): Promise<Sede> {
    return this.conductorRepository.sede(id);
  }
}
