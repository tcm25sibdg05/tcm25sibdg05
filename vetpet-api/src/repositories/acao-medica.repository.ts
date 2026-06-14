import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {AcaoMedica, AcaoMedicaRelations, RegistoTratamento} from '../models';
import {RegistoTratamentoRepository} from './registo-tratamento.repository';

export class AcaoMedicaRepository extends DefaultCrudRepository<
  AcaoMedica,
  typeof AcaoMedica.prototype.id,
  AcaoMedicaRelations
> {

  public readonly registosTratamento: HasManyRepositoryFactory<RegistoTratamento, typeof AcaoMedica.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RegistoTratamentoRepository') protected registoTratamentoRepositoryGetter: Getter<RegistoTratamentoRepository>,
  ) {
    super(AcaoMedica, dataSource);
    this.registosTratamento = this.createHasManyRepositoryFactoryFor('registosTratamento', registoTratamentoRepositoryGetter,);
    this.registerInclusionResolver('registosTratamento', this.registosTratamento.inclusionResolver);
  }
}
