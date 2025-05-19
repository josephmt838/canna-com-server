import { Prisma } from '@prisma/client';
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  // Handle database connection errors
  if (err instanceof Prisma.PrismaClientInitializationError) {
    console.error('Database connection error:', err.message);
    res.status(200).json(null);
    return;
  }

  if (err instanceof AppError) {
    if (err.statusCode === 404) {
      res.status(200).json(null);
      return;
    }

    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      status: 'error',
      message: 'Validation error',
      errors: err.errors,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({
        status: 'error',
        message: 'A record with this value already exists',
      });
      return;
    }
  }

  // Log unhandled errors but don't crash
  console.error('Unhandled error:', err);
  res.status(200).json(null);
};
