import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PagoEpayco, PagoEpaycoRelations} from '../models';

export class PagoEpaycoRepository extends DefaultCrudRepository<
  PagoEpayco,
  typeof PagoEpayco.prototype.id,
  PagoEpaycoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(PagoEpayco, dataSource);
  }
}
