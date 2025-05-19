import type { Category } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const categoryService = {
  async getAllCategories(): Promise<Category[]> {
    try {
      return await prisma.category.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          products: true,
        },
      });
    } catch (error) {
      console.error('Database connection error:', error);
      return [];
    }
  },

  async getCategoryById(id: string): Promise<Category | null> {
    try {
      return await prisma.category.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          products: true,
        },
      });
    } catch (error) {
      console.error('Database connection error:', error);
      return null;
    }
  },

  async createCategory(
    data: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Category | null> {
    try {
      return await prisma.category.create({
        data,
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          products: true,
        },
      });
    } catch (error) {
      console.error('Database connection error:', error);
      return null;
    }
  },

  async updateCategory(
    id: string,
    data: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<Category | null> {
    try {
      return await prisma.category.update({
        where: { id },
        data,
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          products: true,
        },
      });
    } catch (error) {
      console.error('Database connection error:', error);
      return null;
    }
  },

  async deleteCategory(id: string): Promise<Category | null> {
    try {
      return await prisma.category.delete({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          products: true,
        },
      });
    } catch (error) {
      console.error('Database connection error:', error);
      return null;
    }
  },
};
