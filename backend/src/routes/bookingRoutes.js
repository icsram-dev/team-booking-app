import express from 'express';
import bookingController from '../controllers/bookingController.js';
import validate from '../middlewares/bodyValidate.js';
import { createBookingSchema, updateBookingSchema } from '../constants/bookingSchemas.js';
import authorize from '../middlewares/authorize.js'



const router = express.Router();

router.post('/', authorize, validate(createBookingSchema), bookingController.post);

router.get('/:bookingId', bookingController.get);

router.get('/', bookingController.getAll);

router.patch('/:bookingId', validate(updateBookingSchema), bookingController.patch);

router.delete('/:bookingId', bookingController.delete);

router.get('/user/:userId', bookingController.byUser);

export default router;