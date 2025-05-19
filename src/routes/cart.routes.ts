import { Router } from 'express';
import { cartController } from '../controllers/cart.controller.ts';

const router = Router();

router.get('/', cartController.getUserCart);
router.post('/items', cartController.addItemToCart);
router.put('/items/:id', cartController.updateCartItem);
router.delete('/items/:id', cartController.removeItemFromCart);

export const cartRoutes = router;
