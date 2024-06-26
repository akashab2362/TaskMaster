import express from 'express';
import { createTask, deleteTask, getAllTasks, getNearbyTasks, updateTask, updateTaskCompletionStatus } from '../controllers/task.controller.js';
import { isAuthenticatedUser } from '../middleware/auth.js';
const router = express.Router();
router.route('/task/create').post(isAuthenticatedUser, createTask);
router.route('/task/update/:id').put(isAuthenticatedUser, updateTask);
router.route('/task/delete/:id').delete(isAuthenticatedUser, deleteTask);
router.route('/task/tasks').get(isAuthenticatedUser, getAllTasks);
router.route('/task/getNearbyTasks').get(isAuthenticatedUser, getNearbyTasks);
router.route('/task/updateCompletionStatus/:id').put(isAuthenticatedUser, updateTaskCompletionStatus);
export default router;