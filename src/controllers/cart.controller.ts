import type { Request, Response } from 'express';
import { AppError } from '../middlewares/error.middleware.ts';
import { cartService } from '../services/cart.service.ts';

export const cartController = {
  async getUserCart(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id; // Assuming auth middleware sets user
    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }
    const cart = await cartService.getUserCart(userId);
    res.json(cart);
  },

  async addItemToCart(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }
    const cart = await cartService.addItemToCart(userId, req.body);
    res.status(201).json(cart);
  },

  async updateCartItem(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }
    const { id } = req.params;
    const cart = await cartService.updateCartItem(userId, id, req.body);
    if (!cart) {
      throw new AppError(404, 'Cart item not found');
    }
    res.json(cart);
  },

  async removeItemFromCart(req: Request, res: Response): Promise<void> {
    const userId = req.user?.id;
    if (!userId) {
      throw new AppError(401, 'User not authenticated');
    }
    const { id } = req.params;
    const cart = await cartService.removeItemFromCart(userId, id);
    if (!cart) {
      throw new AppError(404, 'Cart item not found');
    }
    res.status(204).send();
  },
};
