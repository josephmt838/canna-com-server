# Canna.com Backend Server

A modern Node.js backend server built with Express, TypeScript, and Prisma ORM.

## Prerequisites

- Node.js 22 or higher
- PostgreSQL database
- npm or yarn package manager

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   NODE_ENV=development
   PORT=3000
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/canna_com?schema=public"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   ```

4. Set up the database:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. Seed the database (optional):
   ```bash
   npm run seed
   ```

## Development

Start the development server:
```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run seed` - Seed the database
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations

## API Endpoints

### Products
- GET `/api/products` - Get all products
- GET `/api/products/:id` - Get product by ID
- POST `/api/products` - Create a new product
- PUT `/api/products/:id` - Update a product
- DELETE `/api/products/:id` - Delete a product

### Categories
- GET `/api/categories` - Get all categories
- GET `/api/categories/:id` - Get category by ID
- POST `/api/categories` - Create a new category
- PUT `/api/categories/:id` - Update a category
- DELETE `/api/categories/:id` - Delete a category

### Users
- GET `/api/users` - Get all users
- GET `/api/users/:id` - Get user by ID
- POST `/api/users` - Create a new user
- PUT `/api/users/:id` - Update a user
- DELETE `/api/users/:id` - Delete a user

### Cart
- GET `/api/cart` - Get user's cart
- POST `/api/cart/items` - Add item to cart
- PUT `/api/cart/items/:id` - Update cart item
- DELETE `/api/cart/items/:id` - Remove item from cart

## Project Structure

```
src/
├── app.ts              # Express app setup
├── server.ts           # Server entry point
├── config/            # Configuration files
├── routes/            # API routes
├── controllers/       # Route controllers
├── services/         # Business logic
├── models/           # Data models
├── middlewares/      # Custom middlewares
├── prisma/           # Prisma schema and client
└── seed/             # Database seed files
``` 