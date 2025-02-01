import BaseRepository from '../repositories/baseRepository';
import { Model } from 'sequelize';

class BaseService<T extends Model> {
  constructor(private repository: BaseRepository<T>) {}

  async create(data: any) {
    return this.repository.create(data);
  }

  async findAll() {
    return this.repository.findAll();
  }

  async findById(id: number) {
    return this.repository.findById(id);
  }

  async update(id: number, data: any) {
    return this.repository.update(id, data);
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}

export default BaseService;
