import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { TASK_STATUS } from '../utils/taskStatus';

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - status
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated ID of the task
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         status:
 *           type: string
 *           enum: [Pending, In-Progress, Completed]
 *           description: The status of the task
 *       example:
 *         id: 1
 *         title: "Task title"
 *         description: "Task description"
 *         status: "Pending"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateTask:
 *       type: object
 *       required:
 *         - title
 *         - status
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         status:
 *           type: string
 *           enum: [Pending, In-Progress, Completed]
 *           description: The status of the task
 *       example:
 *         title: "Task title"
 *         description: "Task description"
 *         status: "Pending"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateTask:
 *       type: object
 *       required:
 *         - title
 *         - status
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the task
 *         description:
 *           type: string
 *           description: The description of the task
 *         status:
 *           type: string
 *           enum: [Pending, In-Progress, Completed]
 *           description: The status of the task
 *       example:
 *         title: "Task title"
 *         description: "Task description"
 *         status: "Pending"
 */

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: keyof typeof TASK_STATUS;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(TASK_STATUS)),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
  }
);

export default Task;
