import type { Request, Response } from 'express';
import { AppError } from '../middlewares/error.middleware.ts';
import { productService } from '../services/product.service.ts';

export const productController = {
  async getAllProducts(_req: Request, res: Response): Promise<void> {
    const products = await productService.getAllProducts();
    res.json(products);
  },

  async getProductById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await productService.getProductById(id);
    if (!product) {
      throw new AppError(404, 'Product not found');
    }
    res.json(product);
  },

  async createProduct(req: Request, res: Response): Promise<void> {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  },

  async updateProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await productService.updateProduct(id, req.body);
    if (!product) {
      throw new AppError(404, 'Product not found');
    }
    res.json(product);
  },

  async deleteProduct(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await productService.deleteProduct(id);
    if (!product) {
      throw new AppError(404, 'Product not found');
    }
    res.status(204).send();
  },
};
