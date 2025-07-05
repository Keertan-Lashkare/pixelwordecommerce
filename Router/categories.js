// src/routes/categories.js
import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// GET /categories
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany()
    res.json(categories)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})


// POST /categories - add new category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body

    // Validate input
    if (!name || typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Category name is required' })
    }

    const trimmedName = name.trim()

    // Check if category already exists (case-insensitive)
    const existing = await prisma.category.findFirst({
      where: {
        name: {
          equals: trimmedName,
          mode: 'insensitive'
        }
      }
    })

    if (existing) {
      return res.status(409).json({ error: 'Category already exists' }) // Conflict
    }

    // Create new category
    const category = await prisma.category.create({
      data: { name: trimmedName }
    })

    res.status(201).json(category)
  } catch (err) {
    console.error('[POST /categories]', err.message)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})



export default router