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
  ServicioFunerario,
} from '../models';
import {ConductorRepository} from '../repositories';

export class ConductorServicioFunerarioController {
  constructor(
    @repository(ConductorRepository)
    public conductorRepository: ConductorRepository,
  ) { }

  @get('/conductors/{id}/servicio-funerario', {
    responses: {
      '200': {
        description: 'ServicioFunerario belonging to Conductor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServicioFunerario),
          },
        },
      },
    },
  })
  async getServicioFunerario(
    @param.path.number('id') id: typeof Conductor.prototype.id,
  ): Promise<ServicioFunerario> {
    return this.conductorRepository.servicioFunerario(id);
  }
}
