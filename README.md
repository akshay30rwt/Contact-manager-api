# Contact Manager API

A REST API to manage personal contacts built with Node.js, Express.js,
MongoDB and JWT authentication. Includes Joi validation and error handling.

## Features
- User registration and login
- Full CRUD for personal contacts
- All routes protected
- Request validation with Joi
- Global error handling

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Joi
- dotenv

## How to Run
- npm install
- npm run dev

## API Endpoints
- POST   /auth/register   - Register a user
- POST   /auth/login      - Login a user
- GET    /contacts        - Get all contacts (protected)
- GET    /contacts/:id    - Get a contact by ID (protected)
- POST   /contacts        - Create a contact (protected)
- PUT    /contacts/:id    - Update a contact (protected)
- DELETE /contacts/:id    - Delete a contact (protected)