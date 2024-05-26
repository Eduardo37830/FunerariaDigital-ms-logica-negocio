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
  getModelSchemaRef,
  getWhereSchemaFor,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {ClientePlan, Plan} from '../models';
import {
  ClientePlanRepository,
  ClienteRepository,
  PlanRepository,
} from '../repositories';

export class ClientePlanController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(PlanRepository)
    public planRepository: PlanRepository,
    @repository(ClientePlanRepository)
    public clientePlanRepository: ClientePlanRepository,
  ) { }

  @get('/clientes/{id}/plans', {
    responses: {
      '200': {
        description: 'Array of Cliente has many Plan through ClientePlan',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ClientePlan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ClientePlan>,
  ): Promise<ClientePlan[]> {
    return this.clientePlanRepository.find(filter);
  }
  //@authenticate
  @post('/adquirir-plan', {
    responses: {
      '200': {
        description: 'ClientePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClientePlan)}},
      },
    },
  })
  async adquirirPlan(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientePlan, {
            title: 'NewClientePlan',
            exclude: ['id'],
          }),
        },
      },
    })
    clientePlanData: Omit<ClientePlan, 'id'>,
  ): Promise<ClientePlan> {
    // Verifica si el cliente existe y está activo
    const cliente = await this.clienteRepository.findById(
      clientePlanData.clienteId,
    );
    console.log(cliente.activo);

    if (!cliente || !cliente.activo) {
      throw new HttpErrors.NotFound(
        `Cliente con ID ${clientePlanData.clienteId} no encontrado o inactivo`,
      );
    }
    {
      // Verifica si el plan existe
      const planExists = await this.planRepository.exists(
        clientePlanData.planId,
      );
      if (!planExists) {
        throw new HttpErrors.NotFound(
          `Plan con ID ${clientePlanData.planId} no encontrado`,
        );
      }

      // Crea la nueva asociación ClientePlan
      console.log('PLAN AQUIRIDO!!!');

      return this.clientePlanRepository.create(clientePlanData);
    }
  }

  @get('/cliente-plan-paginado')
  @response(200, {
    description: 'Array of ClientePlan model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    },
  })
  async findToPagination(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ClientePlan>, // Updated type to Filter<ClientePlan>
  ): Promise<object> {
    const total: number = (await this.clienteRepository.count()).count;
    const registros: ClientePlan[] = await this.clientePlanRepository.find(filter);
    const respuesta = {
      registros: registros,
      totalRegistros: total
    }
    return respuesta;
  }

  @patch('/clientes/{id}/plans', {
    responses: {
      '200': {
        description: 'Cliente.Plan PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plan, {partial: true}),
        },
      },
    })
    plan: Partial<Plan>,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.clienteRepository.plans(id).patch(plan, where);
  }

  //@authenticate
  @del('/clientes/{id}/plans', {
    responses: {
      '200': {
        description: 'Cliente.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Plan)) where?: Where<Plan>,
  ): Promise<Count> {
    return this.clienteRepository.plans(id).delete(where);
  }

  // Nueva función GET para obtener una relación específica ClientePlan
  @get('/obtener-plan/{id}', {
    responses: {
      '200': {
        description: 'ClientePlan model instance',
        content: {'application/json': {schema: getModelSchemaRef(ClientePlan)}},
      },
    },
  })
  async obtenerPlan(
    @param.path.number('id') id: number, // Recibimos la ID del ClientePlan desde la ruta
  ): Promise<ClientePlan> {
    const clientePlan = await this.clientePlanRepository.findById(id); // Buscamos el ClientePlan por su ID

    if (!clientePlan) {
      throw new HttpErrors.NotFound(`No se encontró ninguna asociación ClientePlan con la ID ${id}`);
    }

    return clientePlan;
  }


  // Nueva función DELETE para eliminar una relación específica ClientePlan
  //@authenticate
  @del('/eliminar-plan/{id}', {
    responses: {
      '200': {
        description: 'Cliente.Plan DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async eliminarPlan(
    @param.path.number('id') id: number, // Recibimos la ID del ClientePlan desde la ruta
  ): Promise<any> {
    const clientePlanExists = await this.clientePlanRepository.exists(id); // Verificamos si el ClientePlan existe

    if (!clientePlanExists) {
      throw new HttpErrors.NotFound(`No se encontró ninguna asociación ClientePlan con la ID ${id}`);
    }
    await this.clientePlanRepository.deleteById(id); // Eliminamos el ClientePlan por su ID
  }

  @put('/modificar-plan/{id}', {
    responses: {
      '200': {
        description: 'Cliente.Plan PUT success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async modificarPlan(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ClientePlan, {partial: true}),
        },
      },
    })
    clientePlanData: Partial<ClientePlan>,
  ): Promise<void> {
    const clientePlanExists = await this.clientePlanRepository.findById(id); // Verificamos si el ClientePlan existe

    if (!clientePlanExists) {
      throw new HttpErrors.NotFound(`No se encontró ninguna asociación ClientePlan con la ID ${id}`);
    }
    return this.clientePlanRepository.updateById(id, clientePlanData); // Actualizamos el registro utilizando el método updateById del repository
  }
}
