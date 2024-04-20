import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SalaChat,
  SolicitudServicioFunerario,
} from '../models';
import {SalaChatRepository} from '../repositories';

export class SalaChatSolicitudServicioFunerarioController {
  constructor(
    @repository(SalaChatRepository)
    public salaChatRepository: SalaChatRepository,
  ) { }

  @get('/sala-chats/{id}/solicitud-servicio-funerario', {
    responses: {
      '200': {
        description: 'SolicitudServicioFunerario belonging to SalaChat',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SolicitudServicioFunerario),
          },
        },
      },
    },
  })
  async getSolicitudServicioFunerario(
    @param.path.number('id') id: typeof SalaChat.prototype.id,
  ): Promise<SolicitudServicioFunerario> {
    return this.salaChatRepository.solicitudServicioFunerario(id);
  }
}
