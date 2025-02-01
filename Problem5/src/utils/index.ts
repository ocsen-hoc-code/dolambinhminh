import { Request, Response } from 'express';

export const sendResponse = (res: Response, httpStatus: number, data: any) => {
    res.status(httpStatus).json(data);
};
