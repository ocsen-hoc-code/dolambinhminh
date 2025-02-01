import { body, query, param } from 'express-validator';
import { TASK_STATUS } from '../utils/taskStatus';
import { handleValidationErrors } from '../utils/validationHelpers'; // Adjust the import path as necessary

// Middleware to validate task creation
export const createTaskValidation = [
  body('title')
    .isString().withMessage('Title must be a string')
    .notEmpty().withMessage('Title is required'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),
  body('status')
    .isString().withMessage('Status must be a string')
    .isIn(Object.values(TASK_STATUS)).withMessage('Invalid status'),
  handleValidationErrors
];

// Middleware to validate task update
export const updateTaskValidation = [
  body('title')
    .optional()
    .isString().withMessage('Title must be a string'),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),
  body('status')
    .optional()
    .isString().withMessage('Status must be a string')
    .isIn(Object.values(TASK_STATUS)).withMessage('Invalid status'),
  handleValidationErrors
];

// Middleware to validate task ID
export const idValidation = [
  param('id')
    .isInt({ gt: 0 }).withMessage('ID must be a positive integer'),
  handleValidationErrors
];

// Middleware to validate filters for fetching tasks
export const getTasksValidation = [
  query('title')
    .optional()
    .isString().withMessage('Title must be a string'),
  query('description')
    .optional()
    .isString().withMessage('Description must be a string'),
  query('status')
    .optional()
    .isString().withMessage('Status must be a string')
    .isIn(Object.values(TASK_STATUS)).withMessage('Invalid status'),
  handleValidationErrors
];
