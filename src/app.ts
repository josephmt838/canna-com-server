import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middlewares/error.middleware.ts';
import { cartRoutes } from './routes/cart.routes.ts';
import { categoryRoutes } from './routes/category.routes.ts';
import { productRoutes } from './routes/product.routes.ts';
import { userRoutes } from './routes/user.routes.ts';

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);

// Error handling
app.use(errorHandler);

export { app };
