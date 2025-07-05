// src/routes/cart.js
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'mongodb';


const router = express.Router()
const prisma = new PrismaClient()

// GET /cart?userId=...
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'userId is required' });

    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    if (!cart) return res.json({ items: [] });

    // 🔍 Filter out items with null product
    const filteredItems = cart.items.filter(item => item.product !== null);

    res.json({ ...cart, items: filteredItems });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// POST /cart
router.post('/', async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || quantity == null) {
      return res.status(400).json({ error: 'userId, productId, and quantity are required' });
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be a positive integer' });
    }

    // ✅ Validate product exists
    const productExists = await prisma.product.findUnique({
      where: { id: productId }
    });
    if (!productExists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    let cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const item = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });

    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /cart/:itemId
router.delete('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;

    // ✅ Validate ObjectId
    if (!ObjectId.isValid(itemId) || itemId.length !== 24) {
      return res.status(400).json({ error: 'Invalid item ID format' });
    }

    // ✅ Check if cart item exists
    const existingItem = await prisma.cartItem.findUnique({
      where: { id: itemId }
    });

    if (!existingItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // ✅ Delete item
    await prisma.cartItem.delete({ where: { id: itemId } });

    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



export default router
