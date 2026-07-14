# Taskify API

This project is a NestJS-based task management API with authentication, authorization, Swagger documentation, MongoDB integration, and a cleaner layered architecture.

## Overview

The application follows a simple and professional flow:

```text
Client
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
MongoDB
  ↓
Response
```

## Folder structure

```text
src/
├── app.module.ts
├── main.ts
├── auth/
├── common/
├── database/
├── task/
└── users/
```

### What each part does

- auth/: handles login, registration, and JWT creation.
- common/: shared decorators, guards, config, and base repository logic.
- task/: task routes, task business logic, task repository, DTOs, and task-specific guards.
- users/: user creation and lookup logic.
- database/: MongoDB connection setup.

## Controllers, services, repositories, and DTOs

### Controllers
Controllers receive HTTP requests and delegate work to services.

### Services
Services contain the business rules.

### Repositories
Repositories handle database access so services stay focused on logic.

### DTOs
DTOs validate incoming request data and improve Swagger documentation.

## Decorators
Decorators are reusable helpers that simplify controllers.

Example:
- GetUser reads the JWT from the Authorization header and injects the authenticated user into the handler.

## Guards
Guards protect endpoints.

Example:
- JwtAuthGuard ensures the request has a valid token.
- TaskAccessGuard ensures a user can only access tasks they own.

## Environment setup
Create a .env file using .env.example:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/taskify
JWT_SECRET=your-super-secret-key
```

## Swagger
Swagger is available at:

```text
http://localhost:3000/api
```

## Additional docs
- Full architecture guide: [ARCHITECTURE.md](ARCHITECTURE.md)
- Guard/decorator guide: [README-architecture.md](README-architecture.md)
