# Auth Templates

This repository contains various authentication templates for different technologies. The goal of this repository is to provide ready-to-use templates for user authentication using different stacks and technologies.

## Available Templates

- **Next.js + MongoDB Authentication**

## Next.js + MongoDB Authentication

This template provides a simple authentication system built with **Next.js** and **MongoDB**. It includes the basic authentication routes for user login, registration, and logout.

### Features
- **User Registration**: Allows users to sign up with an email and password.
- **User Login**: Authenticates users by comparing the entered password with the stored hashed password.
- **JWT Authentication**: Uses JWT for securing authenticated routes.
- **Logout**: Clears the session and removes the authentication token from cookies.
- **MongoDB Database**: Stores user data securely in MongoDB.

---

## Getting Started

Follow these steps to get the authentication template running on your local machine:

### Prerequisites

1. Node.js (v16.x or later)
2. MongoDB Database (You can use MongoDB Atlas or a local instance)
3. Basic knowledge of Next.js

### Step 1: Clone the Repository

Clone this repository to your local machine:
```bash
git clone https://github.com/Nischa1Mv/nextjs-mongodb-auth.git
```

### Step 2: Install Dependencies

Navigate to the `nextjs-mongodb-auth` directory and install the dependencies:
```bash
cd nextjs-mongodb-auth
npm install
```

### Step 3: Configure Environment Variables

Copy the `.env.example` file to `.env` and configure the following environment variables:
```
MONGODB_URI=mongodb://localhost:27017/yourDB   # MongoDB connection string
JWT_SECRET=your_jwt_secret   # Secret key for signing JWT tokens
```
If you're using MongoDB Atlas, use the connection string provided by MongoDB Atlas.

### Step 4: Run the Application

Once the environment variables are set up, run the application:
```bash
npm run dev
```
This will start the Next.js server on `http://localhost:3000`.

### Available Routes

#### POST `/api/auth/register`
- **Description**: Registers a new user with an email and password.
- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "your_password"
    }
    ```
- **Response**:
    - `200 OK`: User registered successfully.
    - `400 Bad Request`: Invalid data (missing email/password).

#### POST `/api/auth/login`
- **Description**: Logs in an existing user by verifying the email and password.
- **Request Body**:
    ```json
    {
        "email": "user@example.com",
        "password": "your_password"
    }
    ```
- **Response**:
    - `200 OK`: User logged in successfully. Returns a JWT token.
    - `401 Unauthorized`: Invalid credentials.

#### POST `/api/auth/logout`
- **Description**: Logs the user out by clearing the authentication token from cookies.
- **Response**:
    - `200 OK`: User logged out successfully.

## License

This project is licensed under the MIT License - see the LICENSE file for details.