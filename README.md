# 🛍️ E-commerce Product API with Cart Support

A RESTful backend service for an e-commerce application built using **Node.js**, **Express.js**, **MongoDB**, and **Prisma ORM**. It supports CRUD operations for products and categories, and includes a user-specific cart system.

---

## 🌐 Hosted API

Live at:
**🔗 [`https://ecommercexd.onrender.com`](https://ecommercexd.onrender.com)**


---

## 🚀 Features

* Product APIs with filtering & search
* Category APIs (dynamic, stored in DB)
* User-specific Cart APIs
* Input validation and error handling
* MongoDB with Prisma ORM
* Modular, scalable structure

---

## 📦 Tech Stack

* **Backend Framework**: Node.js + Express.js
* **Database**: MongoDB
* **ORM**: Prisma
* **Language**: JavaScript (ES Module)
* **Deployment**: Render

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ecommerce-api.git
cd ecommerce-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
```

Replace the connection string with your actual **MongoDB Atlas** URI.

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start the Server

```bash
npm start
```

Server will run on:
`http://localhost:5000`

---

## 🧹 API Endpoints

### 🏍️ Product APIs

| Method | Endpoint                     | Description                     |
| ------ | ---------------------------- | ------------------------------- |
| GET    | `/products`                  | Get all products                |
| GET    | `/products?category=Mobiles` | Filter by category              |
| GET    | `/products?search=iphone`    | Search by product title         |
| GET    | `/products/:id`              | Get single product by ID        |
| POST   | `/products`                  | Add new product (with category) |
| PUT    | `/products/:id`              | Update existing product         |
| DELETE | `/products/:id`              | Delete a product                |

#### 📝 Example POST Payload for `/products`

```json
{
  "title": "iPhone 13",
  "description": "Apple smartphone",
  "price": 699,
  "imageUrl": "https://example.com/image.jpg",
  "categoryName": "Mobiles"
}
```

---

### 📂 Category APIs

| Method | Endpoint      | Description          |
| ------ | ------------- | -------------------- |
| GET    | `/categories` | Fetch all categories |
| POST   | `/categories` | Add a new category   |

#### 📝 Example POST Payload for `/categories`

```json
{
  "name": "Laptops"
}
```

---

### 🛒 Cart APIs

| Method | Endpoint           | Description                  |
| ------ | ------------------ | ---------------------------- |
| GET    | `/cart?userId=...` | Get user's cart              |
| POST   | `/cart`            | Add item to user's cart      |
| DELETE | `/cart/:itemId`    | Remove item from user's cart |

#### 📝 Example POST Payload for `/cart`

```json
{
  "userId": "64a9b23cf56c2a7648123abc",
  "productId": "6868432a2cd015cc6faee057",
  "quantity": 2
}
```

---

## 🧠 Notes

* IDs must be valid 24-character MongoDB ObjectIds.
* Prisma automatically handles relations and validations.
* User authentication is mocked using `userId` passed in requests.

---

## 📂 Project Structure

```
.
├── src/
│   ├── routes/
│   │   ├── products.js
│   │   ├── categories.js
│   │   └── cart.js
│   └── server.js
├── prisma/
│   └── schema.prisma
├── .env
├── package.json
└── README.md
```

---


## 🌐 Full Deployed API Endpoint URLs

### 📂 Category APIs

| Method | Endpoint                                              | Description                 |
|--------|-------------------------------------------------------|-----------------------------|
| GET    | https://ecommercexd.onrender.com/categories           | Fetch all product categories|
| POST   | https://ecommercexd.onrender.com/categories           | Add new category            |

---

### 🛍️ Product APIs

| Method | Endpoint                                                                 | Description             |
|--------|--------------------------------------------------------------------------|-------------------------|
| GET    | https://ecommercexd.onrender.com/products                                | List all products       |
| GET    | https://ecommercexd.onrender.com/products/:id                            | Get product by ID       |
| POST   | https://ecommercexd.onrender.com/products                                | Create new product      |
| PUT    | https://ecommercexd.onrender.com/products/:id                            | Update product          |
| DELETE | https://ecommercexd.onrender.com/products/:id                            | Delete product          |
| GET    | https://ecommercexd.onrender.com/products?category=Mobiles&search=iphone | Search/filter products  |

---

### 🛒 Cart APIs

| Method | Endpoint                                                        | Description               |
|--------|-----------------------------------------------------------------|---------------------------|
| GET    | https://ecommercexd.onrender.com/cart?userId=USER_ID            | Get cart items for a user |
| POST   | https://ecommercexd.onrender.com/cart                           | Add product to cart       |
| DELETE | https://ecommercexd.onrender.com/cart/:itemId                   | Remove item from cart     |


## ✅ Author

**Keertan Lashkre**
📧 [keertanlashkare5@gmail.com](mailto:keertanlashkare5@gmail.com)
🌐 [https://ecommercexd.onrender.com](https://ecommercexd.onrender.com)
