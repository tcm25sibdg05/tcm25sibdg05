import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Animal, AnimalRelations, Cliente, Consulta, RegistoTratamento} from '../models';
import {ClienteRepository} from './cliente.repository';
import {ConsultaRepository} from './consulta.repository';
import {RegistoTratamentoRepository} from './registo-tratamento.repository';

export class AnimalRepository extends DefaultCrudRepository<
  Animal,
  typeof Animal.prototype.id,
  AnimalRelations
> {
  public readonly cliente: BelongsToAccessor<Cliente, typeof Animal.prototype.id>;

  public readonly consultas: HasManyRepositoryFactory<Consulta, typeof Animal.prototype.id>;

  public readonly registosTratamento: HasManyRepositoryFactory<RegistoTratamento, typeof Animal.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('ConsultaRepository') protected consultaRepositoryGetter: Getter<ConsultaRepository>, @repository.getter('RegistoTratamentoRepository') protected registoTratamentoRepositoryGetter: Getter<RegistoTratamentoRepository>,
  ) {
    super(Animal, dataSource);
    this.registosTratamento = this.createHasManyRepositoryFactoryFor('registosTratamento', registoTratamentoRepositoryGetter,);
    this.registerInclusionResolver('registosTratamento', this.registosTratamento.inclusionResolver);
    this.consultas = this.createHasManyRepositoryFactoryFor('consultas', consultaRepositoryGetter,);
    this.registerInclusionResolver('consultas', this.consultas.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
