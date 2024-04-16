import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {SalaChat, SalaChatRelations} from '../models';

export class SalaChatRepository extends DefaultCrudRepository<
  SalaChat,
  typeof SalaChat.prototype.id,
  SalaChatRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(SalaChat, dataSource);
  }
}
