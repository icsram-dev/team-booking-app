import express from 'express';
import authController from '../controllers/authController.js';
import { loginSchema, registerSchema } from '../constants/authSchemas.js';
import validate from '../middlewares/bodyValidate.js';

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);

export default router;