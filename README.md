# Red-Steam Backend

This repository contains the **backend** for the Red-Steam project, built with [NestJS](https://nestjs.com/). It provides the API endpoints for user authentication, game management, and more.

## Features

- **Secure Authentication**: JWT-based authentication with access and refresh tokens, including role-based - authorization and token blacklisting.
- **RESTful API**: Designed for comprehensive game and user management.
- **Modular Architecture**: Built with NestJS and TypeORM for scalable, maintainable server-side development.
- **Game Media Management**: Backend logic for serving and organizing media assets using Dropbox integration and database management.
- **Payment Gateway Integration**: Secure PayPal sandbox integration for processing game purchases.
- **Advanced Security**: ReCAPTCHA protection, cookie management with CSRF protection, and custom-built guards.
- **Custom Middleware & Logging**: Used for authentication, request handling, and efficient structured logging.
- **Interceptors & Filters**: Custom logic for request transformation and detailed error handling.
- **Custom Decorators & DTOs**: Reusable code for cleaner and more maintainable logic, with data validation and transformation.
- **Cache Management** (**_Work in Progress_**): Implements caching strategies using Redis for performance optimization.
- **Media Uploads & File Handling**: Upload and manage media assets like images and videos.
- **API Documentation**: Integrated Swagger UI for comprehensive API documentation.
- **Automated Documentation**: Generates detailed, interactive documentation for the project using Compodoc.
- **TypeScript**: Ensures type safety and enhances maintainability for scalable development.

## Technologies

- **NestJS**: Framework used for building efficient, scalable, and maintainable server-side applications.
- **TypeORM**: ORM for PostgreSQL, enabling simplified database management and seamless integration with the app.
- **PostgreSQL**: Manages entities such as Companies, Games, Features, Languages, Tags, and Users.
- **MongoDB**: Handles JWT token blacklisting and Dropbox access token expiration.
- **JWT**: Provides secure authentication and role-based authorization.
- **Dropbox**: Used as a free cloud storage solution for managing media assets, balancing cost and load times.
- **Redis**: Used for cache management to optimize performance (Work in Progress).
- **ReCAPTCHA**: Integrates with forms and endpoints for protection against spam and automated abuse.
- **Google SMTP**: Used for sending email notifications, password recovery, and checkout receipts.
- **TypeScript**: Ensures type safety and better maintainability during development.

---

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or above).
- [pnpm](https://pnpm.io/) package manager.
- [PostgreSQL](https://www.postgresql.org/) (version 16 or above).

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/IbrahemHadidy/red-steam-backend.git
   cd red-steam-backend
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```
3. **Set up environment variables**:

   - Navigate to `src/common/configs/environments/` and copy the content of sample.env into a new file called .env.local.
     -Fill in the required values.

4. **Run the redsteam.sql script**:

   - Ensure your PostgreSQL server is running.
   - Use the provided redsteam.sql file to set up the database schema and initial data. Run the following command in your terminal (bash):
     ```bash
     psql -U postgres -c "CREATE DATABASE redsteam;" 2>/dev/null || echo "Database already exists"
     pg_restore -U your_postgres_user -d redsteam path_to_repository/src/common/configs/db/redsteam.sql
     ```
   - Replace `your_postgres_user` with your PostgreSQL username.
   - Replace `path_to_repository` with the path to your cloned repository.

5. **Run the development server**:

   ```bash
   pnpm start:dev
   ```

6. **Access the API documentation (Swagger)** at `http://localhost:5000/api`.

---

## Database Migration

To run TypeORM migrations:

```bash
pnpm typeorm migration:run
```

---

## Build for Production

Build the application:

```bash
pnpm build
```

Start the production server:

```bash
pnpm start:prod
```

---

## Testing

This project includes integration and E2E tests for verifying the application's behavior. Currently, there are no unit tests, and the testing suite is **incomplete** and may contain issues.

### Running Tests

To run the integration tests, use the following command:

```bash
pnpm run test
```

To run the E2E test, use:

```bash
pnpm run test:e2e
```

---

## Documentation

**This project uses Compodoc to generate detailed and interactive documentation.**

To generate the documentation, run:

```bash
pnpm compodoc
```

Once generated, you can access the documentation in the `documentation` folder within the project.

---

## Future Plans

If the project continues, the following features are planned for potential development:

- **Enhanced Security**: Improved security measures including OTP services for secure logins, phone number verification, and transaction authentication.
- **Cache Management**: Implement caching strategies with Redis to optimize performance.
- **GraphQL Support**: Adding a GraphQL API for more flexible data queries.
- **WebSockets Integration**: Real-time updates for user interactions and notifications.
- **Advanced Logging**: Incorporation of a more robust logging system for better monitoring and debugging.
- **API Rate Limiting**: Adding API rate limiting to prevent abuse and ensure fair usage.
- **CDN Integration**: Implementing a Content Delivery Network (CDN) to distribute media assets, replacing traditional cloud storage. This change will enhance load times and improve the overall user experience by ensuring faster and more reliable access to content.

Note: This list is not exhaustive, and additional features may be added as the project evolves.

