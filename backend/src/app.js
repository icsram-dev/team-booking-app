import express from 'express';
import userRoutes from './routes/userRoutes.js';
import accommodationRoutes from './routes/accommodationRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors'
import favouriteRoutes from "./routes/favouriteRoutes.js";
import errorHandler from './middlewares/errorHandlerMiddleware.js';

const app = express();

app.use(cors())
app.use(express.json());
app.use('/auth', authRoutes)
app.use('/user', userRoutes);
app.use('/accommodation', accommodationRoutes);
app.use('/booking', bookingRoutes);
app.use('/favourites', favouriteRoutes);
app.use(errorHandler)
export default app;
