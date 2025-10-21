# Tata Capital LoanFlow AI + E-Commerce Platform

This project contains two separate applications:

## 1. Tata Capital LoanFlow AI (Main Platform)
Located in the root directory - An AI-powered lending assistant with chatbot, eligibility checker, and loan processing.

**Start the main platform:**
```bash
npm install
npm run dev
```
Runs on: `http://localhost:8080`

## 2. E-Commerce Platform (Separate Application)
Located in `/e-commerce` folder - A standalone shopping platform with Tata Capital financing integration.

**Start the e-commerce platform:**
```bash
cd e-commerce
npm install
npm run dev
```
Runs on: `http://localhost:3000`

## Backend Server (Shared)
Both platforms use the same backend located in `/backend` folder.

**Start the backend:**
```bash
cd backend
npm install
npm run seed  # First time only
npm run dev
```
Runs on: `http://localhost:8000`

## Quick Setup

1. **Backend Setup** (Required for both platforms):
   ```bash
   # Create .env file in root directory
   echo "GEMINI_API_KEY=your_key
   MONGODB_URI=your_mongodb_uri
   PORT=8000
   FRONTEND_URL=http://localhost:8080" > .env
   
   # Setup backend
   cd backend
   npm install
   npm run seed
   npm run dev
   ```

2. **Choose your platform:**

   **Option A - Main LoanFlow Platform:**
   ```bash
   npm install
   npm run dev
   # Visit http://localhost:8080
   ```

   **Option B - E-Commerce Platform:**
   ```bash
   cd e-commerce
   npm install
   npm run dev
   # Visit http://localhost:3000
   ```

## Login Credentials

Use these for both platforms:
- **Email:** any@email.com
- **Phone:** 9876543210

## Project Structure

```
├── backend/              # Shared backend (MongoDB + Express)
│   ├── src/
│   │   ├── agents/      # AI agents for loan processing
│   │   ├── routes/      # API routes
│   │   └── models/      # Database models
│   └── scripts/         # Database seeding
│
├── src/                 # Main LoanFlow AI platform
│   ├── components/
│   ├── pages/
│   └── contexts/
│
└── e-commerce/          # Separate E-Commerce platform
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   └── contexts/
    └── package.json     # Independent dependencies
```

## Features Comparison

### Main LoanFlow Platform
- AI Chatbot (Tara)
- Eligibility Checker
- Document Upload
- Sanction Letter Generation
- Admin Dashboard

### E-Commerce Platform
- Product Catalog
- Shopping Cart
- User Authentication
- Checkout with Financing
- Real-time Loan Approval

Both platforms share:
- Same backend API
- Same database
- Same customer data
- Same loan processing logic