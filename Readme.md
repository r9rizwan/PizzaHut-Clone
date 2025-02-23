# Pizza Hut UK Clone

## Overview

The **Pizza Hut UK Clone** is a full-stack web application replicating the Pizza Hut UK website. It features a user-facing frontend, a backend API for handling requests, and an admin CMS for managing content and deals. The project is built using modern web technologies including **React**, **Tailwind CSS**, **Node.js**, and **MongoDB**.

---

## Features

### Frontend (User Interface)

- Built with **React** and styled using **Tailwind CSS**.
- State management with **Redux Toolkit**.
- Navigation handled by **React Router Dom**.
- Form handling and validation using **React Hook Form** and **Yup**.
- API requests made with **Axios**.
- Loading states with **React Loading Skeleton**.
- UI components and icons from **Material Tailwind** and **Heroicons**.

### Backend (API & Database)

- Powered by **Express.js** as the server framework.
- Data stored in **MongoDB**, managed with **Mongoose ODM**.
- **JWT** (`jsonwebtoken`) for authentication and authorization.
- Password security with **Bcrypt** hashing.
- File uploads handled by **Multer**.
- API request logging with **Morgan**.
- Environment variables managed with **Dotenv**.
- Cross-origin resource sharing enabled with **CORS**.
- Development server auto-restart with **Nodemon**.
- Package management using **PNPM**.

### Admin Panel (Content Management)

- Built with **React**, **React Router**, and **Tailwind CSS**.
- File uploads with **React Dropzone** for drag-and-drop functionality.
- Custom dropdowns with **React Select**.
- Enhanced UI with **Forward Ref** and **Tabler Icons**.

---

## Project Structure

```plaintext
PizzaHut-Clone/
├── Admin/            # Admin panel for content management
│   ├── package.json  # Dependencies
│   └── src/          # React code
│
├── Backend/          # Backend APIs
│   ├── package.json  # Dependencies
│   └── src/          # Express server, API routes, and logic
│
├── Frontend/         # User interface
│   ├── package.json  # Dependencies
│   └── src/          # React components and pages

```

## Backend Functionality

The backend serves as the core of the application, handling API requests from both the frontend and admin panel. Key functionalities include:

- **User Authentication**: Register and login endpoints with JWT-based token generation for secure access.
- **Product Management**: CRUD operations for products (e.g., pizzas), crusts, and sizes, with file upload support for images.
- **Order Processing**: Endpoints to fetch and place user orders.
- **Seeded Data**: Initial data for products, crusts, sizes, and users is seeded into MongoDB for demo purposes (see "Data Seeding" below).
- **Middleware**: Authentication (`checkAuth`) and admin-only access (`checkAdmin`) middleware ensure secure routes.
- **Static Data**: Deals, sides, dips, drinks, desserts, and melts are served from hardcoded datasets, with images hosted locally.

The backend connects to a MongoDB database and uses environment variables for configuration (e.g., database URL, JWT secret).

## Technologies Used

### Frontend

- React
- Tailwind CSS
- Redux Toolkit
- React Hook Form & Yup
- React Router Dom
- Axios
- React Loading Skeleton
- Material Tailwind
- Heroicons

### Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt (Password Hashing)
- Multer (File Uploads)
- Morgan (Request Logging)
- CORS
- Dotenv (Environment Variables)
- Nodemon (Development Server)
- PNPM (Package Manager)

### Admin Panel

- React
- Tailwind CSS
- React Dropzone
- React Select
- Forward Ref
- Tabler Icons

## Installation and Setup

### Prerequisites

- **Node.js** (v16 or higher) and **PNPM** installed.
- A **MongoDB** instance (local or cloud-based, e.g., MongoDB Atlas).

### Backend Setup

1. Navigate to the backend directory:

   ```sh
   cd Backend

   ```

2. Install dependencies:

   ```sh
   pnpm install

   ```

3. Set up environment variables by creating a .env file in the Backend directory (see "Environment Variables" below):

4. Start the backend server:
   ```sh
   pnpm start
   ```

The server will run on http://localhost:5000.

### Frontend Setup

1. Navigate to the frontend directory:

   ```sh
   cd Frontend

   ```

2. Install dependencies:

   ```sh
   pnpm install

   ```

3. Start the development server:
   ```sh
   pnpm run dev
   ```

### Admin Panel Setup

1. Navigate to the admin directory:

   ```sh
   cd Admin

   ```

2. Install dependencies:

   ```sh
   pnpm install

   ```

3. Start the admin panel:
   ```sh
   pnpm run dev
   ```

### Environment Variables

##### Create a .env file in the Backend directory with the following variables:

DB_URL=<your-mongodb-connection-string>
JWT_TOKEN=<your-jwt-secret>
JWT_EXPIRE_IN=7d

### **MongoDB Setup**

The project requires a **MongoDB** database. To set one up:

1. **Sign up** for a free account at [**MongoDB Atlas**](https://www.mongodb.com/cloud/atlas) or **install MongoDB locally**.
2. **Create a new cluster and database** (e.g., `pizzahutDB`).
3. **Obtain the connection string**, e.g.:

mongodb+srv://<username>:<password>@cluster0.r2yjf.mongodb.net/pizzahutDB?retryWrites=true&w=majority

4. **Replace** `<username>` and `<password>` with your **MongoDB credentials**.
5. **Paste** the connection string into the `DB_URL` variable in your `.env` file

### **JWT Configuration**

- **Generate a secure JWT secret**, e.g., using a **random string generator**, and set it as `JWT_TOKEN` in your `.env` file.
- `JWT_EXPIRE_IN` **defines token expiration**, e.g., `7d` for **7 days**.

### Data Seeding

- The backend includes scripts to seed initial data into MongoDB for testing and demo purposes. These scripts run automatically when the server starts if the database is empty.

#### Seeded Data Details

#### **Users (`userSeeds.js`):**

- Creates a default user:
  - **Email:** `john@pizzahut.com`
  - **Password:** `user12345`
- Creates a default admin:
  - **Email:** `admin@pizzahut.com`
  - **Password:** `admin12345`
- Passwords are **hashed** with **Bcrypt** before storage.

---

#### **Products (`productSeeds.js`):**

- Seeds pizza products (e.g., **Margherita**, **Pepperoni Feast**) with sizes (**Small**, **Medium**, **Large**) and prices.
- Includes **sample images** (e.g., `pizza1.jpg`).

---

#### **Crusts (`seedCrusts.js`):**

- Seeds crust options (e.g., **Hand Crafted**, **Stuffed Crust**) with associated **sizes** and **addon prices**.
- **Depends** on sizes being **seeded first**.

### **How It Works**

- The **seeding logic** checks if data exists in the respective collections (**users**, **products**, **crusts**).
- If **empty**, it inserts the predefined data using `bulkSave`.
- **Images** referenced in the seed data are assumed to be available in the **uploads directory** or mapped to **external URLs** in development.

---

### **API Endpoints**

#### **Authentication**

- `POST /api/auth/register` - **Register** a new user.
- `POST /api/auth/login` - **Authenticate** a user and return a **JWT token**.
- `POST /api/auth/login/admin` - **Admin-specific** login.

#### **Products**

- `GET /api/admin/products` - **Fetch all products**.
- `POST /api/admin/products/create` - **Add a new product** _(Admin only, with image upload)_.
- `GET /api/admin/products/:id` - **Fetch a product by ID**.
- `PUT /api/admin/products/update/:id` - **Update a product** _(Admin only, with image upload)_.
- `DELETE /api/admin/products/delete/:id` - **Delete a product** _(Admin only)_.

#### **Crusts**

- `GET /api/admin/crusts/get` - **Fetch all crusts**.
- `POST /api/admin/crusts/create` - **Add a new crust** _(Admin only, with image upload)_.
- `GET /api/admin/crusts/:id` - **Fetch a crust by ID**.
- `PUT /api/admin/crusts/update/:id` - **Update a crust** _(Admin only, with image upload)_.
- `DELETE /api/admin/crusts/delete/:id` - **Delete a crust** _(Admin only)_.

#### **Sizes**

- `GET /api/admin/sizes/get` - **Fetch all sizes** _(Admin only)_.
- `POST /api/admin/sizes/create` - **Add a new size** _(Admin only)_.
- `GET /api/admin/sizes/:id` - **Fetch a size by ID**.
- `PUT /api/admin/sizes/update/:id` - **Update a size** _(Admin only)_.
- `DELETE /api/admin/sizes/delete/:id` - **Delete a size** _(Admin only)_.
- `GET /api/admin/sizes/get/options` - **Fetch sizes as dropdown options**.

#### **Static Data**

- `GET /api/deals` - **Fetch all deals**.
- `GET /api/deals/:id` - **Fetch a deal by ID**.
- `GET /api/melts` - **Fetch all melts**.
- `GET /api/sides` - **Fetch all sides**.
- `GET /api/desserts` - **Fetch all desserts**.
- `GET /api/drinks` - **Fetch all drinks**.
- `GET /api/dips` - **Fetch all dips**.
- `GET /api/banner` - **Fetch banner data**.

#### **Users**

- `GET /api/admin/users/get-current` - **Fetch current authenticated user details** _(requires auth)_.

---

### **License**

This project is **open-source** and available under the **MIT License**.
