# Aquathon App 

This monorepo contains the frontend and backend applications for the Aquathon race tracking system.

## Project Structure

```bash
aquathon-app/
├── aquathon_frontend/   # Next.js frontend application
├── aquathon_backend/    # Node.js backend application
├── package.json         # Root package.json for running both apps
└── pnpm-workspace.yaml  # PNPM workspace configuration
```

## Prerequisites

- Node.js 20 or later
- PNPM package manager

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/CADT-STUDENTS/AQUATHON-APP.git
   cd aquathon-app
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

## Running the Application

To run both the frontend and backend concurrently:
   ```
   pnpm dev
   ```


This will start:
- The frontend on `http://localhost:3000`
- The backend on `http://localhost:4000`

## Individual Application README Files

For more detailed information about each application:

- [Frontend README](./aquathon_frontend/README.md)
- [Backend README](./aquathon_backend/README.md)

## Development

- The frontend is built with Next.js 14 and uses React 18.
- The backend is a Node.js application using Express and MongoDB.

Refer to the individual README files in each application directory for specific development guidelines.

## Environment Variables

Make sure to set up the necessary environment variables:

- For the frontend, create a `.env.local` file in the `aquathon_frontend` directory.
- For the backend, create a `.env.local` file in the `aquathon_backend` directory.

Refer to the respective README files for the required environment variables.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.
