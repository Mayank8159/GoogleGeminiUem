# Google Gemini Student Community Backend

## Project Overview
This is the backend for the Google Gemini Student Community web app, built with Node.js, Express, DynamoDB, and AWS S3-backed uploads. It provides RESTful APIs for the frontend and can run as a traditional local server or an AWS Lambda handler via `lambda.js`.

---

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js (v18+ recommended)
- AWS account with DynamoDB and S3 access

### 2. Install Dependencies
```sh
npm install
```

### 3. Environment Variables
Create a `.env` file in the backend folder with:
```
JWT_SECRET=your_jwt_secret
PORT=5000
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_public_s3_bucket
DYNAMODB_USERS_TABLE=gemini-users
DYNAMODB_ADMINS_TABLE=gemini-admins
DYNAMODB_MESSAGES_TABLE=gemini-messages
DYNAMODB_EVENTS_TABLE=gemini-events
DYNAMODB_TEAMS_TABLE=gemini-teams
```

If you deploy with [template.yaml](template.yaml), the DynamoDB table names and S3 bucket are created for you and injected into the Lambda environment.

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

### 7. Deploy with AWS SAM
```sh
sam build
sam deploy --guided
```
Pass a JWT secret and a globally unique S3 bucket name when prompted.

### 8. Deploy with GitHub Actions
The repository includes [.github/workflows/deploy-backend.yml](../.github/workflows/deploy-backend.yml), which deploys the SAM stack on pushes to `main`.

Required GitHub secrets:
- `AWS_ROLE_TO_ASSUME`
- `AWS_REGION`
- `AWS_STACK_NAME`
- `JWT_SECRET`
- `ASSETS_BUCKET_NAME`

### 9. Serverless Uploads
Event and team images are stored in S3. The bucket must allow public reads for the generated image URLs to render in the frontend.

---

## 🛠️ Tech Stack
- Node.js
- Express
- DynamoDB
- AWS S3
- JWT Authentication

---

## 📁 Project Structure
```
backend/
  controllers/
  middleware/
  config/
  seed/
  utils/
  server.js
  lambda.js
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
- `clearDatabase.js` — Utility to clear all DynamoDB tables (use with caution)
- `template.yaml` — AWS SAM infrastructure template for Lambda, DynamoDB, and S3

---

## 👏 Credits
- Designed and developed by the Google Gemini Student Community @ UEM Kolkata

---

## 📬 Feedback & Contributions
Feel free to open issues or pull requests for suggestions, improvements, or bug fixes!
