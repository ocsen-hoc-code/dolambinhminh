import taskService from '../../services/taskService';
import Task from '../../models/Task';
import { TASK_STATUS } from '../../utils/taskStatus';
import { Op } from 'sequelize';

jest.mock('../../models/Task');

describe('Task Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a task', async () => {
        const taskData = { title: 'Test Task', description: 'Test Description', status: TASK_STATUS.PENDING };
        (Task.create as jest.Mock).mockResolvedValue(taskData);

        const task = await taskService.create(taskData);

        expect(task).toEqual(taskData);
        expect(Task.create).toHaveBeenCalledWith(taskData);
    });

    it('should find tasks by filters', async () => {
        const tasks = [
            { title: 'Test Task 1', description: 'Test Description 1', status: TASK_STATUS.PENDING },
            { title: 'Test Task 2', description: 'Test Description 2', status: TASK_STATUS.PENDING }
        ];
        (Task.findAll as jest.Mock).mockResolvedValue(tasks);
        const dataFilters = { title: 'Test Task', description: 'Test Description' };
        const result = await taskService.findByFilters(dataFilters.title, dataFilters.description);

        expect(result).toEqual(tasks);
        expect(Task.findAll).toHaveBeenCalledWith({
            where: {
                title: { [Op.like]: `%${dataFilters.title}%` },
                description: { [Op.like]: `%${dataFilters.description}%` }
            }
        });
    });

    it('should update a task', async () => {
        const taskId = 1;
        const taskData = { title: 'Updated Task', description: 'Updated Description', status: TASK_STATUS.IN_PROGRESS };
        (Task.update as jest.Mock).mockResolvedValue({ id: taskId, ...taskData });

        const result = await taskService.update(taskId, taskData);

        expect(result).toEqual({ id: taskId, ...taskData });
        expect(Task.update).toHaveBeenCalledWith(taskData, { where: { id: taskId } });
    });

    it('should delete a task', async () => {
        const taskId = 1;
        (Task.destroy as jest.Mock).mockResolvedValue(1);

        const result = await taskService.delete(taskId);

        expect(result).toBe(1);
        expect(Task.destroy).toHaveBeenCalledWith({ where: { id: taskId } });
    });
});
