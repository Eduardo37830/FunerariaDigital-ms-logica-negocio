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
  Beneficiario,
} from '../models';
import {SolicitudServicioFunerarioRepository} from '../repositories';

export class SolicitudServicioFunerarioBeneficiarioController {
  constructor(
    @repository(SolicitudServicioFunerarioRepository)
    public solicitudServicioFunerarioRepository: SolicitudServicioFunerarioRepository,
  ) { }

  @get('/solicitud-servicio-funerarios/{id}/beneficiario', {
    responses: {
      '200': {
        description: 'Beneficiario belonging to SolicitudServicioFunerario',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Beneficiario),
          },
        },
      },
    },
  })
  async getBeneficiario(
    @param.path.number('id') id: typeof SolicitudServicioFunerario.prototype.id,
  ): Promise<Beneficiario> {
    return this.solicitudServicioFunerarioRepository.beneficiario(id);
  }
}
