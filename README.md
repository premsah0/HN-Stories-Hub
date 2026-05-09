# HN Stories Hub

A complete, full-stack MERN (MongoDB, Express, React, Node.js) application that automatically scrapes the top stories from Hacker News, stores them in MongoDB, and displays them via a modern, dark-themed React frontend. It supports user registration, login, and story bookmarking functionality using JWT-based authentication.

## Features
- **Automated Scraping:** Automatically fetches top 10 HN stories on server startup or manually via the API.
- **User Authentication:** Secure register, login, and session persistence using JWT and bcryptjs.
- **Bookmarks:** Authenticated users can bookmark their favorite stories.
- **Modern UI:** Responsive, minimalist dark-glassmorphism design.

## Tech Stack
- **Frontend:** React (Vite), React Router DOM, Context API, Axios, vanilla CSS.
- **Backend:** Node.js, Express, MongoDB/Mongoose, JWT, Axios, Cheerio.

## Project Setup & Installation

### Prerequisites
- Node.js (v14+)
- A MongoDB cluster or local instance (URI is pre-configured in this assignment)

### Installation
1. Navigate to the project root directory.
2. Setup the backend:
   ```bash
   cd backend
   npm install
   ```
3. Setup the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start the Backend:**
   Open a terminal in the `backend` directory and run:
   ```bash
   npm run dev
   # or
   node server.js
   ```
   *The server runs on http://localhost:5000 and connects to MongoDB automatically.*

2. **Start the Frontend:**
   Open a new terminal in the `frontend` directory and run:
   ```bash
   npm run dev
   ```
   *The React app usually runs on http://localhost:5173.*

## API Routes

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login to account

### Stories & Bookmarks
- `GET /api/stories` - Retrieve paginated stories (sorted by points descending)
- `GET /api/stories/:id` - Retrieve a specific story
- `POST /api/stories/:id/bookmark` - Toggle bookmark for a story (Protected route)

### Scraper
- `POST /api/scrape` - Manually trigger the Hacker News scraper

## Folder Structure

```text
/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── scraper/
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   ├── services/
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    └── package.json
```
# HN Stories Hub
