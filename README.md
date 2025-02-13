# management-inventory-app-backend
Backend for an inventory management application. Built with Node.js, Express, and Sequelize. Supports JWT authentication, role-based access control, and CRUD features for users, products, and orders.

# 📌 Inventory Management API Documentation

## 🏷️ Base URL
```
https://management-inventory-app-backend-production.up.railway.app
```

## 🔐 Authentication
- Use **JWT Token** for accessing endpoints requiring authentication.
- Token is stored in **HTTP-only Cookie** upon login.
- Include the token in every **authenticated request**.
---

## 1️⃣ **User Authentication** (`/auth`)

### 🔹 Register User
**Endpoint:** `POST /auth/register`

**Request Body:**  
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**  
```json
{
  "message": "User registered successfully"
}
```

**Validation:** Uses **Joi** to validate `name`, `email`, and `password`.

---

### 🔹 Login User
**Endpoint:** `POST /auth/login`

**Request Body:**  
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**  
```json
{
  "message": "Login successful"
}
```
> **Note:** Token is stored in a cookie upon login.

---

### 🔹 Logout User
**Endpoint:** `POST /auth/logout`

**Response:**  
```json
{
  "message": "Logout successful"
}
```

---

## 2️⃣ **Product Management** (`/product`)

### 🔹 Get All Products
**Endpoint:** `GET /product`

**Headers:** (Optional for customers)  
```
Authorization: Bearer <your-token>
```

**Response:**  
```json
[
  {
    "id": 1,
    "nama": "Laptop",
    "kategori": "Electronics",
    "stok": 10,
    "harga": 7500000
  }
]
```

---

### 🔹 Get Product by ID
**Endpoint:** `GET /product/:id`

**Response:**  
```json
{
  "id": 1,
  "nama": "Laptop",
  "kategori": "Electronics",
  "stok": 10,
  "harga": 7500000
}
```

---

### 🔹 Add Product
**Role:** Admin, Employee  
**Endpoint:** `POST /product`

**Request Body:**  
```json
{
  "nama": "Mouse",
  "kategori": "Accessories",
  "stok": 50,
  "harga": 150000
}
```

**Response:**  
```json
{
  "message": "Product added successfully",
  "product": { "id": 2 }
}
```

---

### 🔹 Update Product
**Role:** Admin, Employee  
**Endpoint:** `PUT /product/:id`

**Request Body:**  
```json
{
  "nama": "Gaming Mouse",
  "kategori": "Accessories",
  "stok": 40,
  "harga": 200000
}
```

**Response:**  
```json
{
  "message": "Product updated successfully"
}
```

---

### 🔹 Delete Product
**Role:** Admin, Employee  
**Endpoint:** `DELETE /product/:id`

**Response:**  
```json
{
  "message": "Product deleted successfully"
}
```

---

## 3️⃣ **User Management** (`/user`)

### 🔹 Get User Profile
**Role:** Customer  
**Endpoint:** `GET /user/profile`

**Response:**  
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "customer"
}
```

---

### 🔹 Get All Users
**Role:** Admin  
**Endpoint:** `GET /user`

**Response:**  
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
]
```

---

### 🔹 Update User Role
**Role:** Admin  
**Endpoint:** `PUT /user/:id`

**Request Body:**  
```json
{
  "role": "employee"
}
```

**Response:**  
```json
{
  "message": "User role updated successfully"
}
```

---

### 🔹 Delete User
**Role:** Admin  
**Endpoint:** `DELETE /user/:id`

**Response:**  
```json
{
  "message": "User deleted successfully"
}
```

---

## 4️⃣ **Order Management** (`/order`)

### 🔹 Get All Orders
**Role:** Admin  
**Endpoint:** `GET /order`

**Response:**  
```json
[
  {
    "id": 1,
    "userId": 5,
    "productId": 2,
    "amount": 2,
    "status": "pending",
    "date": "2025-02-13"
  }
]
```

---

### 🔹 Get My Orders
**Role:** Customer  
**Endpoint:** `GET /order/myOrder`

**Response:**  
```json
[
  {
    "id": 1,
    "productId": 2,
    "amount": 2,
    "status": "pending",
    "date": "2025-02-13"
  }
]
```

---

### 🔹 Create Order
**Role:** Customer  
**Endpoint:** `POST /order/:productId`

**Request Body:**  
```json
{
  "amount": 3
}
```

**Response:**  
```json
{
  "message": "Order placed successfully"
}
```

---

### 🔹 Update Order Status
**Role:** Admin  
**Endpoint:** `PUT /order/:id`

**Request Body:**  
```json
{
  "status": "processing"
}
```

**Response:**  
```json
{
  "message": "Order status updated successfully"
}
```

---

### 🔹 Delete Order
**Role:** Admin, Customer  
**Endpoint:** `DELETE /order/:id`

**Response:**  
```json
{
  "message": "Order deleted successfully"
}
```