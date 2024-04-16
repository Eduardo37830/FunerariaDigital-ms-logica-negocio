import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Error: bad inputDataSource} from '../datasources';
import {SolicitudServicioFunerario, SolicitudServicioFunerarioRelations, Resena} from '../models';
import {ResenaRepository} from './resena.repository';

export class SolicitudServicioFunerarioRepository extends DefaultCrudRepository<
  SolicitudServicioFunerario,
  typeof SolicitudServicioFunerario.prototype.id,
  SolicitudServicioFunerarioRelations
> {

  public readonly resena: HasOneRepositoryFactory<Resena, typeof SolicitudServicioFunerario.prototype.id>;

  constructor(
    @inject('datasources.') dataSource: Error: bad inputDataSource, @repository.getter('ResenaRepository') protected resenaRepositoryGetter: Getter<ResenaRepository>,
  ) {
    super(SolicitudServicioFunerario, dataSource);
    this.resena = this.createHasOneRepositoryFactoryFor('resena', resenaRepositoryGetter);
    this.registerInclusionResolver('resena', this.resena.inclusionResolver);
  }
}
