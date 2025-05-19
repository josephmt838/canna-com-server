import type { Request, Response } from 'express';
import { AppError } from '../middlewares/error.middleware.ts';
import { userService } from '../services/user.service.ts';

export const userController = {
  async getAllUsers(_req: Request, res: Response): Promise<void> {
    const users = await userService.getAllUsers();
    res.json(users);
  },

  async getUserById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    res.json(user);
  },

  async createUser(req: Request, res: Response): Promise<void> {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  },

  async updateUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await userService.updateUser(id, req.body);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    res.json(user);
  },

  async deleteUser(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const user = await userService.deleteUser(id);
    if (!user) {
      throw new AppError(404, 'User not found');
    }
    res.status(204).send();
  },
};
