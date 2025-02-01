import { Request, Response } from 'express';
import taskService from '../services/taskService';
import { HTTP_STATUS } from '../utils/httpStatus';

const sendResponse = (res: Response, status: number, data: any) => {
  res.status(status).json(data);
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.create(req.body);
    sendResponse(res, HTTP_STATUS.CREATED, task);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, { error: (error as Error).message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { title, description, status } = req.query;
    const tasks = await taskService.findByFilters(title as string, description as string, status as string);
    sendResponse(res, HTTP_STATUS.OK, tasks);
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, { error: (error as Error).message });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await taskService.findById(Number(req.params.id));
    if (task) {
      sendResponse(res, HTTP_STATUS.OK, task);
    } else {
      sendResponse(res, HTTP_STATUS.NOT_FOUND, { error: 'Task not found' });
    }
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, { error: (error as Error).message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const updatedTask = await taskService.update(Number(req.params.id), req.body);
    if (updatedTask[0]) {
      sendResponse(res, HTTP_STATUS.OK, await taskService.findById(Number(req.params.id)));
    } else {
      sendResponse(res, HTTP_STATUS.NOT_FOUND, { error: 'Task not found' });
    }
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, { error: (error as Error).message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const deleted = await taskService.delete(Number(req.params.id));
    if (deleted) {
      res.status(HTTP_STATUS.NO_CONTENT).send();
    } else {
      sendResponse(res, HTTP_STATUS.NOT_FOUND, { error: 'Task not found' });
    }
  } catch (error) {
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, { error: (error as Error).message });
  }
};
