import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sala,
  ServicioFunerario,
} from '../models';
import {SalaRepository} from '../repositories';

export class SalaServicioFunerarioController {
  constructor(
    @repository(SalaRepository)
    public salaRepository: SalaRepository,
  ) { }

  @get('/salas/{id}/servicio-funerario', {
    responses: {
      '200': {
        description: 'ServicioFunerario belonging to Sala',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServicioFunerario),
          },
        },
      },
    },
  })
  async getServicioFunerario(
    @param.path.number('id') id: typeof Sala.prototype.id,
  ): Promise<ServicioFunerario> {
    return this.salaRepository.servicioFunerario(id);
  }
}
