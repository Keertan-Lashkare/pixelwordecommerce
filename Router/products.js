import express from 'express'
import { PrismaClient } from '@prisma/client'
import { ObjectId } from 'mongodb'

const router = express.Router()
const prisma = new PrismaClient()

// GET /products?category=Mobiles&search=iphone
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query
    const filters = {}

    if (category) {
      const cat = await prisma.category.findFirst({
        where: {
          name: {
            equals: category,
            mode: 'insensitive'
          }
        }
      })
      if (!cat) return res.json([]) // no products if category doesn't exist
      filters.categoryId = cat.id
    }

    if (search) {
      filters.title = {
        contains: search,
        mode: 'insensitive'
      }
    }

    const products = await prisma.product.findMany({
      where: filters,
      include: { category: true }
    })

    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET /products/:id
router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id

    // ✅ Validate MongoDB ObjectId format
    if (!ObjectId.isValid(id) || id.length !== 24) {
      return res.status(400).json({ error: 'Invalid product ID format' })
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    })

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// POST /products using categoryName
router.post('/', async (req, res) => {
  try {
    const { title, description, price, imageUrl, categoryName } = req.body

    if (!title || !description || !price || !imageUrl || !categoryName) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    if (typeof price !== 'number' || price <= 0) {
      return res.status(400).json({ error: 'Price must be a positive number' })
    }

    if (!imageUrl.startsWith('http')) {
      return res.status(400).json({ error: 'imageUrl must be a valid URL' })
    }

    const category = await prisma.category.findFirst({
      where: {
        name: {
          equals: categoryName.trim(),
          mode: 'insensitive'
        }
      }
    })

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const product = await prisma.product.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        price,
        imageUrl: imageUrl.trim(),
        categoryId: category.id
      }
    })

    res.status(201).json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// PUT /products/:id – Update product
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id

    // ✅ Check if ID is a valid 24-character ObjectId
    if (!ObjectId.isValid(id) || id.length !== 24) {
      return res.status(400).json({ error: 'Invalid product ID format (must be 24 hex characters)' })
    }

    // ✅ Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    const updateData = {}
    const { title, description, price, imageUrl, categoryName } = req.body

    if (title) updateData.title = title.trim()
    if (description) updateData.description = description.trim()

    if (price !== undefined) {
      if (typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Price must be a positive number' })
      }
      updateData.price = price
    }

    if (imageUrl) {
      if (!imageUrl.startsWith('http')) {
        return res.status(400).json({ error: 'imageUrl must be a valid URL' })
      }
      updateData.imageUrl = imageUrl.trim()
    }

    if (categoryName) {
      const category = await prisma.category.findFirst({
        where: {
          name: {
            equals: categoryName.trim(),
            mode: 'insensitive'
          }
        }
      })

      if (!category) {
        return res.status(404).json({ error: 'Category not found' })
      }

      updateData.categoryId = category.id
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updateData
    })

    res.json(updatedProduct)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id

    // ✅ Validate MongoDB ObjectId
    if (!ObjectId.isValid(id) || id.length !== 24) {
      return res.status(400).json({ error: 'Invalid product ID format' })
    }

    // ✅ Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    })

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // ✅ Delete product
    await prisma.product.delete({
      where: { id }
    })

    res.json({ message: 'Product deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// GET /products – List all products
router.get('/', async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.json(products); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





export default router
