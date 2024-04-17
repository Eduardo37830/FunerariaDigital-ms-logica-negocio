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
  Conductor,
} from '../models';
import {ServicioFunerarioRepository} from '../repositories';

export class ServicioFunerarioConductorController {
  constructor(
    @repository(ServicioFunerarioRepository)
    public servicioFunerarioRepository: ServicioFunerarioRepository,
  ) { }

  @get('/servicio-funerarios/{id}/conductor', {
    responses: {
      '200': {
        description: 'Conductor belonging to ServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Conductor),
          },
        },
      },
    },
  })
  async getConductor(
    @param.path.number('id') id: typeof ServicioFunerario.prototype.id,
  ): Promise<Conductor> {
    return this.servicioFunerarioRepository.conductor(id);
  }
}
