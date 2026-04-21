# Shopee

A full-stack e-commerce starter application built with React (Vite) on the frontend and Express + MySQL on the backend.  
The app includes user authentication (signup/login), route-based navigation, and a product listing page powered by Fake Store API.

## Features

- User signup and login with hashed passwords (`bcrypt`)
- Backend validation and structured API responses
- React Router based navigation.
- Product catalog view with ratings from Fake Store API
- Vite dev server with proxy configuration for backend API calls
- MySQL-backed user persistence

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios, CSS Modules, MUI
- **Backend:** Node.js, Express, MySQL2, bcrypt, dotenv, cors
- **Dev Tools:** Nodemon, Concurrently, ESLint

## Prerequisites

- Node.js 18+
- npm 9+
- MySQL server

## Getting Started

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   MYSQL_HOST=localhost
   MYSQL_USER=your_mysql_user
   MYSQL_PASSWORD=your_mysql_password
   MYSQL_DB=your_database_name
   ```

4. Create required database table:

   ```sql
   CREATE TABLE shopUsers (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL
   );
   ```

5. Start frontend and backend together:

   ```bash
   npm run dev
   ```

   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:6060`


## Available Scripts

- `npm run dev`
Runs both the **Vite frontend** and **Express backend** at the same time using `concurrently`.

- `npm run ui`
Runs only the frontend development server.

- `npm run server`
Runs only the backend server using `nodemon` for automatic restarts.

- `npm run build`
Compiles the frontend into static files for production in the `dist` folder.

- `npm run preview`
Locally previews the production build created by the build script.

- `npm run lint`
Checks your code for linting errors using ESLint.

- ``note: to make the scripts work as expected replace the scripts in your package.json file with this``:
"scripts": {
   "ui": "vite",
   "server": "npx nodemon backend/routers.js",
   "dev": "concurrently \"npm run ui\" \"npm run server\"",
   "build": "vite build",
   "lint": "eslint .",
   "preview": "vite preview"
},


## API Endpoints

Base URL: `http://localhost:6060/api`

- `GET /get-all-users` - Fetch all users
- `GET /get-user/:id` - Fetch user by id
- `POST /signup` - Register a new user
- `POST /login` - Authenticate a user

## Notes

- Frontend requests to `/api/*` are proxied to `http://localhost:6060` via `vite.config.js`.
- Product data currently comes from [Fake Store API](https://fakestoreapi.com/).