# Aquathon Frontend

Aquathon Frontend is a Next.js-based web application for managing and tracking aquathlon races. It provides a user-friendly interface for creating, editing, and monitoring races and participants.

## Features

- Create and manage races
- Add and edit participants
- Real-time race tracking
- Responsive design for various devices

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- React Query
- Zod for form validation
- Socket.io for real-time updates

## Getting Started

### Prerequisites

- Node.js 18 or later
- pnpm package manager

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/CADT-STUDENTS/AQUATHON-APP.git
   cd aquathon-frontend
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=your_api_base_url
   NEXT_PUBLIC_WS_BASE_URL=your_websocket_base_url
   ```

4. Run the development server:
   ```
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app`: Next.js app router and page components
- `src/components`: Reusable React components
- `src/domains`: Domain-specific interfaces and constants
- `src/services`: API service functions using React Query
- `src/hooks`: Custom React hooks
- `src/styles`: Global styles and Tailwind CSS configuration

## Available Scripts
