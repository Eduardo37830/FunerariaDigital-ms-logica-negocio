import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {Sala} from '../models';
import {SalaRepository} from '../repositories';

export class SalaController {
  constructor(
    @repository(SalaRepository)
    public salaRepository: SalaRepository,
  ) { }

  @post('/sala')
  @response(200, {
    description: 'Sala model instance',
    content: {'application/json': {schema: getModelSchemaRef(Sala)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sala, {
            title: 'NewSala',
            exclude: ['id'],
          }),
        },
      },
    })
    sala: Omit<Sala, 'id'>,
  ): Promise<Sala> {
    return this.salaRepository.create(sala);
  }

  @get('/sala/count')
  @response(200, {
    description: 'Sala model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Sala) where?: Where<Sala>,
  ): Promise<Count> {
    return this.salaRepository.count(where);
  }

  @get('/sala')
  @response(200, {
    description: 'Array of Sala model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sala, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Sala) filter?: Filter<Sala>,
  ): Promise<Sala[]> {
    return this.salaRepository.find(filter);
  }

  @patch('/sala')
  @response(200, {
    description: 'Sala PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sala, {partial: true}),
        },
      },
    })
    sala: Sala,
    @param.where(Sala) where?: Where<Sala>,
  ): Promise<Count> {
    return this.salaRepository.updateAll(sala, where);
  }

  @get('/sala/{id}')
  @response(200, {
    description: 'Sala model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Sala, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Sala, {exclude: 'where'}) filter?: FilterExcludingWhere<Sala>
  ): Promise<Sala> {
    return this.salaRepository.findById(id, filter);
  }

  @get('/sala-paginado')
  @response(200, {
    description: 'Array of Sala model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Sala, {includeRelations: true}),
        },
      },
    },
  })
  async findToPagination(
    @param.filter(Sala) filter?: Filter<Sala>,
  ): Promise<object> {
    const total: number = (await this.salaRepository.count()).count;
    const registros: Sala[] = await this.salaRepository.find(filter);
    const respuesta = {
      registros: registros,
      totalRegistros: total
    }
    return respuesta;
  }


  @patch('/sala/{id}')
  @response(204, {
    description: 'Sala PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sala, {partial: true}),
        },
      },
    })
    sala: Sala,
  ): Promise<void> {
    await this.salaRepository.updateById(id, sala);
  }

  @put('/sala/{id}')
  @response(204, {
    description: 'Sala PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() sala: Sala,
  ): Promise<void> {
    await this.salaRepository.replaceById(id, sala);
  }

  @del('/sala/{id}')
  @response(204, {
    description: 'Sala DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.salaRepository.deleteById(id);
  }

  @post('/sala/verificar-disponibilidad/{id}')
  @response(200, {
    description: 'Verificar la disponibilidad de la sala para un rango de tiempo específico',
    content: {'application/json': {schema: {type: 'object'}}},
  })
  async verificarDisponibilidada(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              horaEntrada: {type: 'string', format: 'date-time'},
              horaSalida: {type: 'string', format: 'date-time'},
              salaId: {type: 'number'},
            },
            required: ['horaEntrada', 'horaSalida', 'salaId'],
          },
        },
      },
    })
    reserva: {horaEntrada: Date, horaSalida: Date, salaId?: number},
  ): Promise<{disponible: boolean, mensaje?: string}> {
    const {horaEntrada, horaSalida, salaId} = reserva;

    // Obtener las reservas existentes para la sala en el rango de tiempo especificado
    const reservasExistentes: Sala[] = await this.salaRepository.find({
      where: {
        and: [
          {id: salaId},
          {
            or: [
              {horaEntradaCuerpo: {between: [horaEntrada, horaSalida]}},
              {horaSalidaCuerpo: {between: [horaEntrada, horaSalida]}},
            ],
          },
        ],
      },
    });

    // Si hay reservas existentes, la sala no está disponible
    if (reservasExistentes.length > 0) {
      return {disponible: false, mensaje: 'La sala no está disponible en el horario especificado.'};
    }

    // Si no hay reservas existentes, la sala está disponible
    return {disponible: true};
  }

  @get('/salas-disponibles')
  @response(200, {
    description: 'Array of available Sala instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: {type: 'number'},
              nombre: {type: 'string'},
              tipo: {type: 'string'},
              capacidad: {type: 'number'},
              horaEntradaCuerpo: {type: 'string', format: 'date-time'},
              horaSalidaCuerpo: {type: 'string', format: 'date-time'},
              disponible: {type: 'boolean'},
              sedeId: {type: 'number'},
              // Incluir cualquier otra propiedad de interés de la silla
            }
          }
        }
      }
    }
  })
  async salasDisponibles(): Promise<Sala[]> {
    const todasLasSalas: Sala[] = await this.salaRepository.find();
    const ahora = new Date();
    const horaEntrada = ahora; // Aquí defines tu lógica para la hora de entrada deseada
    const horaSalida = ahora; // Aquí defines tu lógica para la hora de salida deseada

    const salasDisponibles: Sala[] = [];

    // Iterar sobre todas las salas para verificar disponibilidad
    for (const sala of todasLasSalas) {
      const {disponible} = await this.verificarDisponibilidad({
        horaEntrada,
        horaSalida,
        salaId: sala.id,
      });

      if (disponible) {
        salasDisponibles.push(sala);
      }
    }

    return salasDisponibles;
  }

  // Función existente para verificar disponibilidad, adaptada para salas
  async verificarDisponibilidad(reserva: {horaEntrada: Date, horaSalida: Date, salaId?: number}): Promise<{disponible: boolean, mensaje?: string}> {
    const {horaEntrada, horaSalida, salaId} = reserva;

    // Obtener las reservas existentes para la sala en el rango de tiempo especificado
    const reservasExistentes: Sala[] = await this.salaRepository.find({
      where: {
        and: [
          {id: salaId},
          {
            or: [
              {horaEntradaCuerpo: {between: [horaEntrada, horaSalida]}},
              {horaSalidaCuerpo: {between: [horaEntrada, horaSalida]}},
            ],
          },
        ],
      },
    });

    // Si hay reservas existentes, la sala no está disponible
    if (reservasExistentes.length > 0) {
      return {disponible: false, mensaje: 'La sala no está disponible en el horario especificado.'};
    }

    // Si no hay reservas existentes, la sala está disponible
    return {disponible: true};
  }
}
