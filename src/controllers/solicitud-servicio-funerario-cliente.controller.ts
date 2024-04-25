import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudServicioFunerario,
  Cliente,
} from '../models';
import {SolicitudServicioFunerarioRepository} from '../repositories';

export class SolicitudServicioFunerarioClienteController {
  constructor(
    @repository(SolicitudServicioFunerarioRepository)
    public solicitudServicioFunerarioRepository: SolicitudServicioFunerarioRepository,
  ) { }

  @get('/solicitud-servicio-funerarios/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to SolicitudServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Cliente),
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof SolicitudServicioFunerario.prototype.id,
  ): Promise<Cliente> {
    return this.solicitudServicioFunerarioRepository.cliente(id);
  }
}
