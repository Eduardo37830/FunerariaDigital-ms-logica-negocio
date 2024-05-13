import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Cliente,
  SolicitudServicioFunerario,
} from '../models';
import {ClienteRepository, SolicitudServicioFunerarioRepository} from '../repositories';

export class ClienteSolicitudServicioFunerarioController {
  constructor(
    @repository(ClienteRepository) protected clienteRepository: ClienteRepository,
    @repository(SolicitudServicioFunerarioRepository)
    public solicitudServicioFunerarioRepository: SolicitudServicioFunerarioRepository,
  ) { }

  @get('/clientes/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Array of Cliente has many SolicitudServicioFunerario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudServicioFunerario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SolicitudServicioFunerario>,
  ): Promise<SolicitudServicioFunerario[]> {
    return this.clienteRepository.solicitudServicioFunerarios(id).find(filter);
  }


  @post('/clientes/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Cliente model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudServicioFunerario)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Cliente.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {
            title: 'NewSolicitudServicioFunerarioInCliente',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) solicitudServicioFunerario: Omit<SolicitudServicioFunerario, 'id'>,
  ): Promise<SolicitudServicioFunerario> {
    return this.clienteRepository.solicitudServicioFunerarios(id).create(solicitudServicioFunerario);
  }

  @patch('/clientes/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudServicioFunerario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudServicioFunerario, {partial: true}),
        },
      },
    })
    solicitudServicioFunerario: Partial<SolicitudServicioFunerario>,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicioFunerario)) where?: Where<SolicitudServicioFunerario>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudServicioFunerarios(id).patch(solicitudServicioFunerario, where);
  }

  @del('/clientes/{id}/solicitud-servicio-funerarios', {
    responses: {
      '200': {
        description: 'Cliente.SolicitudServicioFunerario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SolicitudServicioFunerario)) where?: Where<SolicitudServicioFunerario>,
  ): Promise<Count> {
    return this.clienteRepository.solicitudServicioFunerarios(id).delete(where);
  }

  /**
 * Obtiene una lista paginada de solicitudes de servicio funerario para un cliente específico.
 * @param id El ID del cliente para el que se desea obtener las solicitudes de servicio funerario.
 * @param page El número de página actual (por defecto es 1).
 * @param pageSize El tamaño de la página (por defecto es 10).
 * @param filter Un objeto que contiene filtros opcionales para la consulta (por defecto es null).
 * @returns Un objeto que contiene una lista de solicitudes de servicio funerario y el total de registros.
 */
  @get('/clientes/{id}/solicitud-servicio-funerarios/paginado', {
    responses: {
      '200': {
        description: 'Array of SolicitudServicioFunerario model instances with pagination info',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                registros: {
                  type: 'array',
                  items: getModelSchemaRef(SolicitudServicioFunerario),
                },
                totalRegistros: {type: 'number'},
              },
            },
          },
        },
      },
    },
  })
  async findPaginated(
    @param.path.number('id') id: typeof SolicitudServicioFunerario.prototype.clienteId,
    @param.query.number('page') page: number = 1,
    @param.query.number('pageSize') pageSize: number = 10,
    @param.query.object('filter', getFilterSchemaFor(SolicitudServicioFunerario)) filter?: Filter<SolicitudServicioFunerario>,
  ): Promise<object> {
    const where = filter?.where ?? {clienteId: id};
    const total: number = (await this.solicitudServicioFunerarioRepository.count(where)).count;
    const registros: SolicitudServicioFunerario[] = await this.solicitudServicioFunerarioRepository.find({
      ...filter,
      where,
      skip: (page - 1) * pageSize,
      limit: pageSize,
    });
    return {registros, totalRegistros: total};
  }

  @get('/clientes-con-mas-solicitudes', {
    responses: {
      '200': {
        description: 'Cliente con más solicitudes',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                cliente: {type: 'string'},
                cantidadSolicitudes: {type: 'number'},
              },
            },
          },
        },
      },
    },
  })
  async clienteConMasSolicitudes(): Promise<object> {
    const query = `
    SELECT c.id AS cliente_id, c.primerNombre AS nombre_cliente, COUNT(ss.id) AS cantidad_servicios
    FROM cliente c
    JOIN solicitudserviciofunerario ss ON c.id = ss.clienteId
    WHERE ss.fechaSolicitud BETWEEN '2024-04-30 20:19:30' AND '2024-05-30 14:45:00'
    GROUP BY c.id, c.primerNombre
    ORDER BY COUNT(ss.id) DESC
    LIMIT 1; -- Cambia 10 por el número deseado de clientes en el resultado
    `;
    const result = await this.clienteRepository.dataSource.execute(query);
    return result[0];
  }

  /**
   * Obtiene un array de clientes que han solicitado más servicios en un rango de fechas.
   * @param startDate La fecha de inicio del rango.
   * @param endDate La fecha de fin del rango.
   * @param limit (Opcional) El número máximo de clientes a devolver. Por defecto es 10.
   * @returns Un array de objetos que contienen la información del cliente y la cantidad de servicios solicitados.
   */
  @get('/clientes-mas-servicios', {
    responses: {
      '200': {
        description: 'Array of clients with most services in a date range',
      },
    },
  })
  async clientesConMasServicios(
    @param.query.string('startDate') startDate: string,
    @param.query.string('endDate') endDate: string,
    @param.query.number('limit') limit: number = 10,
  ): Promise<any> {
    const query = `
      SELECT c.id AS cliente_id, c.primerNombre AS nombre_cliente, COUNT(ss.id) AS cantidad_servicios
      FROM cliente c
      JOIN solicitudserviciofunerario ss ON c.id = ss.clienteId
      WHERE ss.fechaSolicitud BETWEEN '2024-04-30 20:19:30' AND '2024-05-30 14:45:00'
      GROUP BY c.id, c.primerNombre
      ORDER BY COUNT(ss.id) DESC
      LIMIT 7;
    `;
    return this.clienteRepository.execute(query, []);
  }
}
