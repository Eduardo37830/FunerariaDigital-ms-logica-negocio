import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {Comentario, ComentarioRelations} from '../models';

export class ComentarioRepository extends DefaultCrudRepository<
  Comentario,
  typeof Comentario.prototype.id,
  ComentarioRelations
> {
  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource,
  ) {
    super(Comentario, dataSource);
  }
}
