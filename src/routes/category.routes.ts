import { Router } from 'express';
import { categoryController } from '../controllers/category.controller.ts';

const router = Router();

router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);

export const categoryRoutes = router;
