# Commit API Server - User Guide

This is the backend server, responsible for handling API requests, managing data, and serving responses to the frontend application.

## Requirements

Before installing and running the API server, make sure you have the following requirements installed:

- Node.js (version 12 or higher)
- npm (version 6 or higher)
- PostgreSQL (or any other database you are using)

## Installation

### Clone the Repository

Clone the project repository:

```bash
git clone https://iic2154-uc-cl/letscommit-past-inv.git
```

## Install Dependencies

Navigate to the server directory and run the following command to install the dependencies:

```bash
cd yourproject/server
npm install

```

## Environment Configuration

Create a `.env` file in the root directory of the server and set up the necessary environment variables. An example of a `.env` file might look like this:

```env
DB_HOST=your_db_host
DB_USER=your_db_user
DB_PASS=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
PORT=your_port
```

## Running the Server

To run the server in development mode, use the following command:

```bash
npm start
```

To prepare and run the server in production, follow these steps:
1. Ensure all environment variables are set in the `.env` file.
2. Start the server using a process manager like pm2:

