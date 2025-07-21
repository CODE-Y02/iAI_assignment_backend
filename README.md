# Backend API Project

This is a RESTful API for managing categories and products, built with Node.js, Express, and Prisma ORM, using a MySQL database.

## Prerequisites

Before setting up the project, ensure you have the following installed:

- Node.js (v18 or higher)
- npm (v9 or higher)
- Docker and Docker Compose (for running the MySQL database)
- Git (for cloning the repository)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies

Run the following command to install all required Node.js packages:

```bash
npm install
```

This will also run `prisma generate` automatically (via postinstall script) to set up Prisma client.

### 3. Set Up Environment Variables

Create a `.env` file in the project root and configure the following variables:

```env
DATABASE_URL="mysql://user:password@localhost:3306/database_name"
PORT=3000
```

Replace `user`, `password`, and `database_name` with your MySQL credentials and database name.

### 4. Start the MySQL Database

Use Docker Compose to start the MySQL database:

```bash
npm run db:up
```

This starts a MySQL container in the background. Ensure Docker is running.

### 5. Run Database Migrations

Apply the database schema using Prisma migrations:

```bash
npm run db:migrate
```

This creates the necessary tables for categories and products.

### 6. Seed the Database (Optional)

Populate the database with initial data:

```bash
npm run db:seed
```

### 7. Start the Application

For production:
```bash
npm start
```

For development (with auto-restart on code changes):
```bash
npm run dev
```

### 8. Access the API

The API will be available at `http://localhost:3000` (or the port specified in your `.env` file).

### 9. Explore the Database (Optional)

Use Prisma Studio to visually inspect and manage your database:

```bash
npm run db:studio
```

This opens a browser-based interface at `http://localhost:5555`.

## Additional Commands

### Check Migration Status

```bash
npm run db:status
```

### Reset the Database

Drops and recreates the database schema (use with caution):

```bash
npm run db:reset
```

### Stop the Database

Shut down the MySQL container:

```bash
npm run db:down
```

## API Documentation

The API includes Swagger documentation. Once the server is running, access it at:

```
http://localhost:3000/api-docs
```

## Project Structure

- `index.js`: Entry point for the application.
- `prisma/`: Contains Prisma schema (`schema.prisma`) and seed script (`seed.js`).

## Dependencies

- **Express**: Web framework for building the API.
- **Prisma**: ORM for database interactions.
- **MySQL2**: MySQL driver for Node.js.
- **Joi**: Schema validation for request payloads.
- **Swagger**: API documentation.
- **CORS**: Enables cross-origin requests.
- **Nodemon** (dev): Auto-restarts the server during development.

## Troubleshooting

- **Database Connection Issues**: Verify the `DATABASE_URL` in your `.env` file and ensure the MySQL container is running (`docker ps`).
- **Port Conflicts**: Change the `PORT` in `.env` if 3000 is in use.
- **Prisma Errors**: Run `npm run db:status` to check migration status or `npm run db:reset` to reset the database.
