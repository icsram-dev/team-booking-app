import express from 'express'
import accommodationController from '../controllers/accommodationController.js';
import userAccommodationController from '../controllers/userAccommodationController.js';
import { createAccommodationSchema, updateAccommodationSchema } from '../constants/accommodationSchemas.js';
import validate from '../middlewares/bodyValidate.js';
import authorize from '../middlewares/authorize.js'

const router = express.Router();

router.post('/', authorize, validate(createAccommodationSchema), accommodationController.post);

router.get('/', accommodationController.getAll);

router.get('/user', authorize, userAccommodationController.getAll);

router.patch('/user/:accommodationId', authorize, validate(updateAccommodationSchema), userAccommodationController.patch);

router.delete('/user/:accommodationId', authorize, userAccommodationController.delete);

router.get('/:accommodationId', accommodationController.get);

router.patch('/:accommodationId', validate(updateAccommodationSchema), accommodationController.patch);

router.delete('/:accommodationId', accommodationController.delete);

export default router;
