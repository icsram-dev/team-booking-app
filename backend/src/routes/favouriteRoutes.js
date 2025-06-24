import express from 'express';
import favouriteController from '../controllers/favouriteController.js';
import authenticate from '../middlewares/authorize.js';
import { updateUserSchema } from '../constants/userSchemas.js';
import validate from '../middlewares/bodyValidate.js';

const router = express.Router();

router.get('/', authenticate, favouriteController.getFavourites);
router.post('/:accommodationId', authenticate, validate(updateUserSchema), favouriteController.addFavourite);
router.delete('/:accommodationId', authenticate, favouriteController.removeFavourite);

export default router;