import { Op } from 'sequelize';
import Task from '../models/Task';
import BaseRepository from './baseRepository';

class TaskRepository extends BaseRepository<Task> {
  constructor() {
    super(Task);
  }

  async findByFilters(title?: string, description?: string, status?: string) {
    const whereClause: any = {};

    if (title) {
      whereClause.title = { [Op.like]: `%${title}%` };
    }

    if (description) {
      whereClause.description = { [Op.like]: `%${description}%` };
    }

    if (status) {
      whereClause.status = status;
    }
    let test =  whereClause.toString();
    return Task.findAll({ where: whereClause });
  }
}

export default new TaskRepository();
