import type { Product } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middlewares/error.middleware.ts';

const prisma = new PrismaClient();

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    return prisma.product.findMany({
      include: {
        category: true,
      },
    });
  },

  async getProductById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
      },
    });
  },

  async createProduct(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    try {
      return await prisma.product.create({
        data,
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new AppError(400, 'Failed to create product');
    }
  },

  async updateProduct(
    id: string,
    data: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Product | null> {
    try {
      return await prisma.product.update({
        where: { id },
        data,
        include: {
          category: true,
        },
      });
    } catch (error) {
      throw new AppError(400, 'Failed to update product');
    }
  },

  async deleteProduct(id: string): Promise<Product | null> {
    try {
      return await prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      throw new AppError(400, 'Failed to delete product');
    }
  },
};
