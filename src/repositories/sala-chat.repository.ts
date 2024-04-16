import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {SalaChat, SalaChatRelations} from '../models';

export class SalaChatRepository extends DefaultCrudRepository<
  SalaChat,
  typeof SalaChat.prototype.id,
  SalaChatRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(SalaChat, dataSource);
  }
}
