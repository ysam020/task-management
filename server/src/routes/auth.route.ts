import { Router } from "express";
import authController from "../controllers//auth.controller";
import { validate } from "../middlewares/validations.middleware";
import { authenticate } from "../middlewares/authentication.middleware";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../utils/validations";

const router = Router();

/**
 * @route   POST /auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", validate(registerSchema), authController.register);

/**
 * @route   POST /auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", validate(loginSchema), authController.login);

/**
 * @route   POST /auth/refresh
 * @desc    Refresh access token
 * @access  Public
 */
router.post("/refresh", validate(refreshTokenSchema), authController.refresh);

/**
 * @route   POST /auth/logout
 * @desc    Logout user (invalidate refresh token)
 * @access  Public
 */
router.post("/logout", validate(refreshTokenSchema), authController.logout);

/**
 * @route   POST /auth/logout-all
 * @desc    Logout from all devices
 * @access  Private
 */
router.post("/logout-all", authenticate, authController.logoutAll);

/**
 * @route   GET /auth/me
 * @desc    Get current user
 * @access  Private
 */
router.get("/me", authenticate, authController.getCurrentUser);

export default router;
