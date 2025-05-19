import type { Cart } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { AppError } from '../middlewares/error.middleware.ts';

const prisma = new PrismaClient();

export const cartService = {
  async getUserCart(userId: string): Promise<Cart | null> {
    return prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  async addItemToCart(
    userId: string,
    itemData: { productId: string; quantity: number }
  ): Promise<Cart> {
    try {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!cart) {
        return prisma.cart.create({
          data: {
            userId,
            items: {
              create: {
                productId: itemData.productId,
                quantity: itemData.quantity,
              },
            },
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });
      }

      const existingItem = cart.items.find((item) => item.productId === itemData.productId);

      if (existingItem) {
        return prisma.cart.update({
          where: { id: cart.id },
          data: {
            items: {
              update: {
                where: { id: existingItem.id },
                data: {
                  quantity: existingItem.quantity + itemData.quantity,
                },
              },
            },
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });
      }

      return prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId: itemData.productId,
              quantity: itemData.quantity,
            },
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      throw new AppError(400, 'Failed to add item to cart');
    }
  },

  async updateCartItem(
    userId: string,
    itemId: string,
    data: { quantity: number }
  ): Promise<Cart | null> {
    try {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!cart) {
        throw new AppError(404, 'Cart not found');
      }

      const item = cart.items.find((item) => item.id === itemId);
      if (!item) {
        throw new AppError(404, 'Cart item not found');
      }

      if (data.quantity <= 0) {
        return prisma.cart.update({
          where: { id: cart.id },
          data: {
            items: {
              delete: { id: itemId },
            },
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });
      }

      return prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: itemId },
              data: { quantity: data.quantity },
            },
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      throw new AppError(400, 'Failed to update cart item');
    }
  },

  async removeItemFromCart(userId: string, itemId: string): Promise<Cart | null> {
    try {
      const cart = await prisma.cart.findUnique({
        where: { userId },
        include: { items: true },
      });

      if (!cart) {
        throw new AppError(404, 'Cart not found');
      }

      const item = cart.items.find((item) => item.id === itemId);
      if (!item) {
        throw new AppError(404, 'Cart item not found');
      }

      return prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: itemId },
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    } catch (error) {
      throw new AppError(400, 'Failed to remove item from cart');
    }
  },
};
