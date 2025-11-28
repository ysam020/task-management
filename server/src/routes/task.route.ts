import { Router } from "express";
import taskController from "../controllers/task.controller";
import { validate, validateQuery } from "../middlewares/validations.middleware";
import { authenticate } from "../middlewares/authentication.middleware";
import {
  createTaskSchema,
  updateTaskSchema,
  taskQuerySchema,
} from "../utils/validations";

const router = Router();

// All task routes require authentication
router.use(authenticate);

/**
 * @route   GET /tasks
 * @desc    Get all tasks for logged-in user with pagination, filtering, and search
 * @access  Private
 */
router.get("/", validateQuery(taskQuerySchema), taskController.getTasks);

/**
 * @route   POST /tasks
 * @desc    Create a new task
 * @access  Private
 */
router.post("/", validate(createTaskSchema), taskController.createTask);

/**
 * @route   GET /tasks/stats
 * @desc    Get task statistics
 * @access  Private
 */
router.get("/stats", taskController.getTaskStats);

/**
 * @route   GET /tasks/:id
 * @desc    Get a single task by ID
 * @access  Private
 */
router.get("/:id", taskController.getTaskById);

/**
 * @route   PATCH /tasks/:id
 * @desc    Update a task
 * @access  Private
 */
router.patch("/:id", validate(updateTaskSchema), taskController.updateTask);

/**
 * @route   DELETE /tasks/:id
 * @desc    Delete a task
 * @access  Private
 */
router.delete("/:id", taskController.deleteTask);

/**
 * @route   POST /tasks/:id/toggle
 * @desc    Toggle task status (PENDING -> IN_PROGRESS -> COMPLETED -> PENDING)
 * @access  Private
 */
router.post("/:id/toggle", taskController.toggleTaskStatus);

export default router;
