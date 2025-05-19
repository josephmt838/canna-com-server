import type { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middlewares/error.middleware.ts';

const prisma = new PrismaClient();

export const userService = {
  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany({
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  },

  async getUserById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        cart: {
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });
  },

  async createUser(data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    try {
      return await prisma.user.create({
        data,
        include: {
          cart: true,
        },
      });
    } catch (error) {
      throw new AppError(400, 'Failed to create user');
    }
  },

  async updateUser(
    id: string,
    data: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<User | null> {
    try {
      return await prisma.user.update({
        where: { id },
        data,
        include: {
          cart: {
            include: {
              items: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new AppError(400, 'Failed to update user');
    }
  },

  async deleteUser(id: string): Promise<User | null> {
    try {
      return await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new AppError(400, 'Failed to delete user');
    }
  },
};
