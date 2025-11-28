import { Router } from "express";
import authController from "../controllers//auth.controller";
import { validate } from "../middlewares/validations.middleware";
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
} from "../utils/validations";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post("/refresh", validate(refreshTokenSchema), authController.refresh);
router.post("/logout", validate(refreshTokenSchema), authController.logout);

export default router;
