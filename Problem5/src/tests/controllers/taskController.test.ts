import request from 'supertest';
import app from '../../index';
import  Task from '../../models/Task';
import { TASK_STATUS } from '../../utils/taskStatus';

jest.mock('../../models/Task');

describe('Task Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a task', async () => {
        const taskData = { title: 'Test Task', description: 'Test Description', status: TASK_STATUS.PENDING };
        (Task.create as jest.Mock).mockResolvedValue(taskData);

        const response = await request(app)
            .post('/tasks')
            .send(taskData)
            .expect(201);

        expect(response.body).toEqual(taskData);
    });

    it('should get tasks by filters', async () => {
        const tasks = [
            { title: 'Test Task 1', description: 'Test Description 1', status: TASK_STATUS.PENDING },
            { title: 'Test Task 2', description: 'Test Description 2', status: TASK_STATUS.PENDING }
        ];
        (Task.findAll as jest.Mock).mockResolvedValue(tasks);

        const response = await request(app)
            .get('/tasks?title=Test Task&description=Test Description')
            .expect(200);

        expect(response.body).toEqual(tasks);
    });

    it('should update a task', async () => {
        const taskId = 1;
        const taskData = { title: 'Updated Task', description: 'Updated Description', status: TASK_STATUS.IN_PROGRESS };
        (Task.findByPk as jest.Mock).mockResolvedValue({ id: taskId, ...taskData });
        (Task.update as jest.Mock).mockResolvedValue([1]);  // Update returns an array with the number of affected rows

        const response = await request(app)
            .put(`/tasks/${taskId}`)
            .send(taskData)
            .expect(200);

        expect(response.body).toEqual({ id: taskId, ...taskData });
    });

    it('should delete a task', async () => {
        const taskId = 1;
        (Task.findByPk as jest.Mock).mockResolvedValue({ id: taskId });
        (Task.destroy as jest.Mock).mockResolvedValue(1);  // Destroy returns the number of affected rows

        const response = await request(app)
            .delete(`/tasks/${taskId}`)
            .expect(204);

        expect(response.body).toEqual({});
    });

});
