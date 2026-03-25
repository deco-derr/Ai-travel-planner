# AI-Based Personalized Travel Itinerary Planner 🌍✈️

A dynamic, full-stack travel planning application that utilizes AI concepts to generate highly personalized, day-by-day itineraries based on your budget, duration, interests, and specific destination (featuring dynamic landmark integration for cities worldwide).

## Features
- **Secure Authentication**: JWT-based login and registration.
- **Dynamic AI Generation**: Localized fallback generation that maps real-world monuments, parks, and palaces to your schedule.
- **Premium UI**: Custom dark-mode aesthetic featuring glassmorphism and subtle micro-animations.
- **Dashboard**: Save and retrieve your past itineraries utilizing a local SQLite database.

## Prerequisites
Before running this project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- NPM (which comes with Node.js)

## Getting Started

### 1. Clone the Repository
Open your terminal and clone the code to your local machine:
```bash
git clone https://github.com/deco-derr/Ai-travel-planner.git
cd Ai-travel-planner
```

### 2. Backend Setup
Open a terminal and navigate to the backend folder to install dependencies and start the local server:
```bash
cd backend
npm install
node server.js
```
*The backend server will run on `http://localhost:5000` and automatically create the local SQLite database.*

### 3. Frontend Setup
Open a **new, separate terminal window** and navigate to the frontend folder:
```bash
cd frontend
npm install
npm run dev
```
*The frontend will start via Vite. Follow the local link provided in your terminal (usually `http://localhost:5173`) to view the application in your browser!*
