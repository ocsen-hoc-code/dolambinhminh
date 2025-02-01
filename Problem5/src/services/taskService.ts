import BaseService from './baseService';
import taskRepository from '../repositories/taskRepository';
import Task from '../models/Task';

class TaskService extends BaseService<Task> {
  constructor() {
    super(taskRepository);
  }

  async findByFilters(title?: string, description?: string, status?: string) {
    return taskRepository.findByFilters(title, description, status);
  }
}

export default new TaskService();
