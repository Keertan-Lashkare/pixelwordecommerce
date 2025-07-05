import express from 'express'
import dotenv from 'dotenv'
import productRoutes from './Router/products.js'
import categoryRoutes from './Router/categories.js'
import cartRoutes from './Router/cart.js'

dotenv.config()
const app = express()
app.use(express.json())

// Mount routers
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)
app.use('/cart', cartRoutes)


app.listen(5000, () => {
  console.log("server is working")
})
