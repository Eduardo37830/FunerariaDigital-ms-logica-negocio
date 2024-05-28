import {service} from '@loopback/core';
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
import {ConfiguracionPagos} from '../config/configuracion.pagos';
import {ClientePlan, Plan} from '../models';
import {
  ClientePlanRepository,
  ClienteRepository,
  PlanRepository,
} from '../repositories';
import {NotificacionesService} from '../services';

export class ClientePlanController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(PlanRepository)
    public planRepository: PlanRepository,
    @repository(ClientePlanRepository)
    public clientePlanRepository: ClientePlanRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
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

      // Configuración de Epayco
      const epayco = require('epayco-sdk-node')({
        apiKey: ConfiguracionPagos.apiKey,
        privateKey: ConfiguracionPagos.privateKey,
        lang: 'ES',
        test: true
      })

      //Datos de la tarjeta de crédito de Prueba de Epaycpo
      //  --- No cambiar
      const credit_info = {
        "card[number]": "4575623182290326",
        "card[exp_year]": "2025",
        "card[exp_month]": "12",
        "card[cvc]": "123",
        "hasCvv": true //hasCvv: validar codigo de seguridad en la transacción
      }

      epayco.token.create(credit_info)
        .then(function (token: any) {
          console.log(token);
          console.log("Transacción exitosa" + token);
        })
        .catch(function (err: string) {
          console.log("err: " + err);
        });

      const customer_info = {
        token_card: "toke_id",
        name: cliente.primerNombre,
        last_name: cliente.primerApellido,
        email: cliente.correo,
        default: true,
        //Optional parameters: These parameters are important when validating the credit card transaction
        city: cliente.ciudadResidencia,
        address: cliente.direccion,
        phone: cliente.celular,
        cell_phone: "3010000001"
      }

      console.log('customer_info', customer_info);

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
    const clientePlanExists = await this.clientePlanRepository.exists(id); // Verificamos si el ClientePlan existe

    if (!clientePlanExists) {
      throw new HttpErrors.NotFound(`No se encontró ninguna asociación ClientePlan con la ID ${id}`);
    }

    const cliente = await this.clienteRepository.findById(clientePlanData.clienteId);

    if (!cliente) {
      throw new HttpErrors.NotFound(`No se encontró el cliente con la ID ${clientePlanData.clienteId}`);
    }

    // Configuración de Epayco

    const epayco = require('epayco-sdk-node')({
      apiKey: ConfiguracionPagos.apiKey,
      privateKey: ConfiguracionPagos.privateKey,
      lang: 'ES',
      test: true
    })


    const credit_info = {
      "card[number]": "4575623182290326",
      "card[exp_year]": "2025",
      "card[exp_month]": "12",
      "card[cvc]": "123",
      "hasCvv": true //hasCvv: validar codigo de seguridad en la transacción
    }

    const token = await epayco.token.create(credit_info);
    console.log("Token creado:", token);

    if (!token.id) {
      throw new HttpErrors.InternalServerError("Error al crear el token de la tarjeta");
    }

    const customer_info = {
      token_card: token.id,
      name: cliente.primerNombre,
      last_name: cliente.primerApellido,
      email: cliente.correo,
      default: true,
      city: cliente.ciudadResidencia,
      address: cliente.direccion,
      phone: cliente.celular,
      cell_phone: "3010000001"
    };

    const customer = await epayco.customers.create(customer_info);
    console.log("Cliente creado:", customer);

    if (!customer.data || !customer.data.customerId) {
      throw new HttpErrors.InternalServerError("Error al crear el cliente");
    }

    const plan_info = {
      id_plan: clientePlanData.id?.toString(),
      name: clientePlanData.nombre,
      description: clientePlanData.detalles,
      amount: clientePlanData.tarifa,
      currency: "cop",
      interval: "month",
      interval_count: 1,
      trial_days: 30
    };

    if (!plan_info.id_plan) {
      const plan = await epayco.plans.create(plan_info);
      console.log("Plan creado:", plan);
      if (!plan.data || !plan.data.planId) {
        throw new HttpErrors.InternalServerError("Error al crear el plan");
      }
    }


    const pse_info = {
      bank: "1022",
      invoice: clientePlanData.id?.toString(),
      description: "pay test",
      value: clientePlanData.tarifa!.toString(),
      tax: "0",
      tax_base: "0",
      currency: "COP",
      type_person: "0",
      doc_type: "CC",
      doc_number: "123456",
      name: "testing",
      last_name: "PAYCO",
      email: "no-responder@payco.co",
      country: "CO",
      cell_phone: "3010000001",
      ip: "190.000.000.000", /*This is the client's IP, it is required */
      url_response: "https://ejemplo.com/respuesta.html",
      url_confirmation: "https://ejemplo.com/confirmacion",
      metodoconfirmacion: "GET",
    };

    console.log("Información de la transacción:", pse_info);

    const bankTransaction = await epayco.bank.create(pse_info);

    console.log("Transacción bancaria:", bankTransaction);

    console.log("Transacción bancaria:", bankTransaction);

    if (!bankTransaction || !bankTransaction.success) {
      console.error("Error en la transacción bancaria:", bankTransaction);
      throw new HttpErrors.InternalServerError("Error en la transacción bancaria");
    }

    await this.clientePlanRepository.updateById(id, clientePlanData);
    console.log('Plan modificado exitosamente');
  } catch(err: any) {
    console.log("Error en la transacción", err);
    throw new HttpErrors.InternalServerError("Error en la transacción con Epayco");
  }

  @post('/pago-epayco', {
    responses: {
      '200': {
        description: 'Cliente.Plan PUT success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async PagarPlan(
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

    const clientePlanExists = await this.clientePlanRepository.exists(id); // Verificamos si el ClientePlan existe

    if (!clientePlanExists) {
      throw new HttpErrors.NotFound(`No se encontró ninguna asociación ClientePlan con la ID ${id}`);
    }

    const cliente = await this.clienteRepository.findById(clientePlanData.clienteId);

    if (!cliente) {
      throw new HttpErrors.NotFound(`No se encontró el cliente con la ID ${clientePlanData.clienteId}`);
    }

    // Configuración de Epayco

    const epayco = require('epayco-sdk-node')({
      apiKey: ConfiguracionPagos.apiKey,
      privateKey: ConfiguracionPagos.privateKey,
      lang: 'ES',
      test: true
    })


    const credit_info = {
      "card[number]": "4575623182290326",
      "card[exp_year]": "2025",
      "card[exp_month]": "12",
      "card[cvc]": "123",
      "hasCvv": true //hasCvv: validar codigo de seguridad en la transacción
    }

    const token = await epayco.token.create(credit_info);
    console.log("Token creado:", token);

    if (!token.id) {
      throw new HttpErrors.InternalServerError("Error al crear el token de la tarjeta");
    }

    const customer_info = {
      token_card: token.id,
      name: cliente.primerNombre,
      last_name: cliente.primerApellido,
      email: cliente.correo,
      default: true,
      city: cliente.ciudadResidencia,
      address: cliente.direccion,
      phone: cliente.celular,
      cell_phone: "3010000001"
    };

    const customer = await epayco.customers.create(customer_info);
    console.log("Cliente creado:", customer);

    if (!customer.data || !customer.data.customerId) {
      throw new HttpErrors.InternalServerError("Error al crear el cliente");
    }

    const plan_info = {
      id_plan: clientePlanData.id?.toString(),
      name: clientePlanData.nombre,
      description: clientePlanData.detalles,
      amount: clientePlanData.tarifa,
      currency: "cop",
      interval: "month",
      interval_count: 1,
      trial_days: 30
    };

    if (!plan_info.id_plan) {
      const plan = await epayco.plans.create(plan_info);
      console.log("Plan creado:", plan);
      if (!plan.data || !plan.data.planId) {
        throw new HttpErrors.InternalServerError("Error al crear el plan");
      }
    }


    const pse_info = {
      bank: "1022",
      invoice: clientePlanData.id?.toString(),
      description: "pay test",
      value: clientePlanData.tarifa!.toString(),
      tax: "0",
      tax_base: "0",
      currency: "COP",
      type_person: "0",
      doc_type: "CC",
      doc_number: "123456",
      name: "testing",
      last_name: "PAYCO",
      email: "no-responder@payco.co",
      country: "CO",
      cell_phone: "3010000001",
      ip: "190.000.000.000", /*This is the client's IP, it is required */
      url_response: "https://ejemplo.com/respuesta.html",
      url_confirmation: "https://ejemplo.com/confirmacion",
      metodoconfirmacion: "GET",
    };

    console.log("Información de la transacción:", pse_info);

    const bankTransaction = await epayco.bank.create(pse_info);

    console.log("Transacción bancaria:", bankTransaction);

    console.log("Transacción bancaria:", bankTransaction);

    if (!bankTransaction || !bankTransaction.success) {
      console.error("Error en la transacción bancaria:", bankTransaction);
      throw new HttpErrors.InternalServerError("Error en la transacción bancaria");
    }
  }
}

