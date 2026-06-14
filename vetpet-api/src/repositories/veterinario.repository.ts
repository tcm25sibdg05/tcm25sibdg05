import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Veterinario, VeterinarioRelations, Consulta} from '../models';
import {ConsultaRepository} from './consulta.repository';

export class VeterinarioRepository extends DefaultCrudRepository<
  Veterinario,
  typeof Veterinario.prototype.id,
  VeterinarioRelations
> {

  public readonly consultas: HasManyRepositoryFactory<Consulta, typeof Veterinario.prototype.id>;
  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>,
  ) {
    super(Veterinario, dataSource);
    this.consultas = this.createHasManyRepositoryFactoryFor('consultas', consultaRepositoryGetter,);
    this.registerInclusionResolver('consultas', this.consultas.inclusionResolver);
  }
}
