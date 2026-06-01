# Google Gemini Student Community Backend

## Project Overview
This is the backend for the Google Gemini Student Community web app, built with Node.js, Express, MongoDB, and AWS S3-backed uploads. It provides RESTful APIs for the frontend and can run as a traditional local server or an AWS Lambda handler via `lambda.js`.

---

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### 2. Install Dependencies
```sh
npm install
```

### 3. Environment Variables
Create a `.env` file in the backend folder with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_public_s3_bucket
```

### 4. Seed Admin User (optional)
```sh
node seed/seedAdmin.js
```

### 5. Start Server
```sh
npm start
```
Server runs on `http://localhost:5000` by default.

### 6. Run as Lambda Handler
The Lambda-compatible handler is exported from `lambda.js`.
```
node lambda.js
```
For AWS deployment, point your function handler to `handler` in that file.

### 7. Serverless Uploads
Event and team images are stored in S3. The bucket must allow public reads for the generated image URLs to render in the frontend.

---

## 🛠️ Tech Stack
- Node.js
- Express
- MongoDB (Mongoose)
- AWS S3
- JWT Authentication

---

## 📁 Project Structure
```
backend/
  controllers/
  middleware/
  models/
  routes/
  config/
  seed/
  socket/
  server.js
  package.json
  README.md
```

---

## 📚 API Endpoints

### Auth
- `POST /api/auth/register` — Register new user
- `POST /api/auth/login` — Login user

### Admin Auth
- `POST /api/admin/login` — Login admin

### Events
- `POST /api/admin/events` — Create event (admin only)
- `GET /api/events/upcoming` — List upcoming events
- `GET /api/events/completed` — List completed events

### Messages
- `GET /api/messages` — Get latest 100 messages (auth required)


---

## 🔌 Real-Time Features
- Event lists now refresh via polling on the frontend, which keeps the app compatible with Lambda and other serverless runtimes.

---

## 🔒 Authentication
- JWT-based authentication for users and admins
- Protected routes for event and user management

---

## 📝 Additional Scripts
- `clearDatabase.js` — Utility to clear all collections (use with caution)

---

## 👏 Credits
- Designed and developed by the Google Gemini Student Community @ UEM Kolkata

---

## 📬 Feedback & Contributions
Feel free to open issues or pull requests for suggestions, improvements, or bug fixes!
