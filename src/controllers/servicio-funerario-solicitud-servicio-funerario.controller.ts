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
  SolicitudServicioFunerario,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioSolicitudServicioFunerarioController {
  constructor(
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/solicitud-servicio-funerario', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario belonging to ServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SolicitudServicioFunerario),
          },
        },
      },
    },
  })
  async getSolicitudServicioFunerario(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id,
  ): Promise<SolicitudServicioFunerario> {
    return this.servicioFunerarioRepository.solicitudServicioFunerario(id);
  }
}
