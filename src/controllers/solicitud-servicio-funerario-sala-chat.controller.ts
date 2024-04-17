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
  SalaChat,
} from '../models';
import {SolicitudServicioFunerarioRepository} from '../repositories';

export class SolicitudServicioFunerarioSalaChatController {
  constructor(
    @repository(SolicitudServicioFunerarioRepository)
    public solicitudServicioFunerarioRepository: SolicitudServicioFunerarioRepository,
  ) { }

  @get('/solicitud-servicio-funerarios/{id}/sala-chat', {
    responses: {
      '200': {
        description: 'SalaChat belonging to SolicitudServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SalaChat),
          },
        },
      },
    },
  })
  async getSalaChat(
    @param.path.number('id') id: typeof SolicitudServicioFunerario.prototype.id,
  ): Promise<SalaChat> {
    return this.solicitudServicioFunerarioRepository.salaChat(id);
  }
}
