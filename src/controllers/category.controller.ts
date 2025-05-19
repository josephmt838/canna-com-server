import type { Request, Response } from 'express';
import { AppError } from '../middlewares/error.middleware.ts';
import { categoryService } from '../services/category.service.ts';

export const categoryController = {
  async getAllCategories(_req: Request, res: Response): Promise<void> {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  },

  async getCategoryById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const category = await categoryService.getCategoryById(id);
    if (!category) {
      res.json(null);
    } else {
      res.json(category);
    }
  },

  async createCategory(req: Request, res: Response): Promise<void> {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
  },

  async updateCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const category = await categoryService.updateCategory(id, req.body);
    if (!category) {
      res.json(null);
    } else {
      res.json(category);
    }
  },

  async deleteCategory(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const category = await categoryService.deleteCategory(id);
    if (!category) {
      throw new AppError(404, 'Category not found');
    }
    res.status(204).send();
  },
};
