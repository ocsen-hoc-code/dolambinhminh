import { Model, ModelCtor, UpdateOptions, DestroyOptions, WhereOptions } from 'sequelize';

class BaseRepository<T extends Model> {
  constructor(private model: ModelCtor<T>) {}

  async create(data: Partial<T['_creationAttributes']>) {
    return this.model.create(data as T['_creationAttributes']);
  }

  async findAll() {
    return this.model.findAll();
  }

  async findById(id: number) {
    return this.model.findByPk(id);
  }

  async update(id: number, data: Partial<T['_attributes']>) {
    const where: WhereOptions = { id };

    return this.model.update(data, {
      where,
    } as UpdateOptions<Partial<T['_attributes']>>);
  }

  async delete(id: number) {
    const where: WhereOptions = { id };

    return this.model.destroy({
      where,
    } as DestroyOptions);
  }
}

export default BaseRepository;
