import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  ServicioFunerario,
  EstadoServicio,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioEstadoServicioController {
  constructor(
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/estado-servicio', {
    responses: {
      '200': {
        description: 'EstadoServicio belonging to ServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EstadoServicio),
          },
        },
      },
    },
  })
  async getEstadoServicio(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id,
  ): Promise<EstadoServicio> {
    return this.servicioFunerarioRepository.estadoServicio(id);
  }
}
