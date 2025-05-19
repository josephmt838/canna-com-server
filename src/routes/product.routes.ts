import { Router } from 'express';
import { productController } from '../controllers/product.controller.ts';

const router = Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export const productRoutes = router;
