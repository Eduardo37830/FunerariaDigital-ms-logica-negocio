import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  EstadoServicio,
  ServicioFunerario,
} from '../models';
import {EstadoServicioRepository} from '../repositories';

export class EstadoServicioServicioFunerarioController {
  constructor(
    @repository(EstadoServicioRepository)
    public estadoServicioRepository: EstadoServicioRepository,
  ) { }

  @get('/estado-servicios/{id}/servicio-funerario', {
    responses: {
      '200': {
        description: 'ServicioFunerario belonging to EstadoServicio',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServicioFunerario),
          },
        },
      },
    },
  })
  async getServicioFunerario(
    @param.path.number('id') id: typeof EstadoServicio.prototype.id,
  ): Promise<ServicioFunerario> {
    return this.estadoServicioRepository.servicioFunerario(id);
  }
}
