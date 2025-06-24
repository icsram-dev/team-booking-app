import express from 'express';
import userController from '../controllers/userController.js';
import validate from '../middlewares/bodyValidate.js';
import { createUserSchema, updateUserSchema, changePasswordSchema } from '../constants/userSchemas.js';

const router = express.Router();

router.post('/', validate(createUserSchema), userController.post);

router.get('/', userController.getAll);

router.get('/:userId', userController.get);

router.patch('/:userId', validate(updateUserSchema), userController.patch);

router.patch('/:userId/password', validate(changePasswordSchema), userController.changePassword);

router.delete('/:userId', userController.delete);

export default router;


