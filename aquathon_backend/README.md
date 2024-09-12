# Aquathon Backend

Aquathon Backend is a Node.js-based server application that provides the API and database management for the Aquathon race tracking system.

## Features

- RESTful API for race and participant management
- Real-time updates using Socket.IO
- MongoDB database integration
- Swagger API documentation

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB with Mongoose
- Socket.IO
- Swagger UI for API documentation

## Getting Started

### Prerequisites

- Node.js 20 or later
- pnpm package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/CADT-STUDENTS/AQUATHON-APP.git
   cd aquathon-backend
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```
   NODE_PORT=4000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the development server:
   ```
   pnpm dev
   ```

5. The server will be running at `http://localhost:4000`

## Project Structure

- `src/`: Source code directory
  - `configs/`: Configuration files (e.g., database connection)
  - `models/`: Database models
  - `routes/`: API route definitions
  - `sockets/`: Socket.IO event handlers
  - `index.ts`: Main application entry point

## API Documentation

API documentation is available via Swagger UI. After starting the server, visit:

http://localhost:4000/api-docs

## Available Scripts
