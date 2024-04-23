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
  requestBody,
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
            schema: {type: 'array', items: getModelSchemaRef(Plan)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Plan>,
  ): Promise<Plan[]> {
    return this.clienteRepository.plans(id).find(filter);
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
}
