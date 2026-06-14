# NestJS Project Architecture

## Overview

This project follows the modular architecture provided by NestJS. The application is divided into multiple modules such as Authentication, Users, Database, and Task Management. Each module is responsible for a specific feature of the system, making the application easier to maintain, test, and scale.

The application follows the following flow:

```text
Client Request
      ↓
Controller
      ↓
Service
      ↓
Schema (Mongoose Model)
      ↓
MongoDB
      ↓
Response
```

---

# Main Application Files

## main.ts

The `main.ts` file is the entry point of the application. It bootstraps the NestJS server and starts listening for incoming requests.

Responsibilities:

* Creates the NestJS application.
* Loads the root module (`AppModule`).
* Starts the HTTP server.

---

## app.module.ts

The `app.module.ts` file is the root module of the project. It imports and connects all feature modules.

Imported Modules:

* AuthModule
* UsersModule
* TaskModule
* DatabaseModule

This file acts as the central configuration point for the entire application.

---

# Authentication Module

The Authentication Module handles user login, registration, and JWT-based authentication.

Files:

```text
auth/
├── auth.controller.ts
├── auth.service.ts
├── auth.module.ts
├── jwt.strategy.ts
└── constants.ts
```

### auth.controller.ts

Receives authentication-related requests from the client.

Examples:

* Login
* Register

The controller forwards the request to the service layer.

### auth.service.ts

Contains the authentication business logic.

Responsibilities:

* Validate user credentials.
* Generate JWT tokens.
* Handle registration and login operations.

### jwt.strategy.ts

Validates JWT tokens attached to incoming requests.

When a user sends:

```http
Authorization: Bearer <token>
```

The strategy verifies the token and extracts user information.

---

# Users Module

The Users Module manages user-related operations.

Files:

```text
users/
├── users.module.ts
├── users.service.ts
├── schemas/user.schema.ts
├── dtos/user.dto.ts
└── interface/user.interface.ts
```

### user.schema.ts

Defines the structure of user documents stored in MongoDB.

Example fields:

* name
* email
* password

### user.dto.ts

Defines and validates incoming user data.

### user.interface.ts

Provides TypeScript interfaces for type safety.

### users.service.ts

Contains user-related business logic such as:

* Creating users
* Finding users
* Retrieving user information

---

# Task Module

The Task Module is responsible for task management operations.

Files:

```text
task/
├── task.controller.ts
├── task.service.ts
├── task.module.ts
├── schema/task.schema.ts
├── interfaces/task.dto.ts
└── interfaces/task.interface.ts
```

### task.controller.ts

Handles incoming task-related requests.

Examples:

* Create Task
* Get Tasks
* Update Task
* Delete Task

The controller does not directly interact with the database. Instead, it delegates work to the service layer.

### task.service.ts

Contains all task-related business logic.

Responsibilities:

* Create tasks
* Update tasks
* Delete tasks
* Retrieve tasks

The service communicates with MongoDB through Mongoose models.

### task.schema.ts

Defines the MongoDB document structure for tasks.

Example fields:

```text
Task
├── title
├── description
├── completed
└── userId
```

### task.dto.ts

Validates task request data before processing.

### task.interface.ts

Provides TypeScript interfaces for task objects.

---

# Database Module

The Database Module manages MongoDB connectivity.

Files:

```text
database/
├── database.module.ts
├── database.service.ts
└── database.controller.ts
```

### database.module.ts

Configures MongoDB using Mongoose.

Responsibilities:

* Establish database connection.
* Register database providers.

### database.service.ts

Contains database-related logic and connection management.

---

# Guards

The project uses Guards to secure routes and enforce authorization rules.

Files:

```text
guards/
├── jwt-auth.guard.ts
└── validateUser.guard.ts
```

### JwtAuthGuard

Protects routes from unauthorized access.

Flow:

```text
Request
   ↓
JwtAuthGuard
   ↓
JWT Validation
   ↓
Controller
```

Only authenticated users can access protected endpoints.

### ValidateUserGuard

Ensures that a user can only access or modify resources they own.

For example, a user cannot update or delete another user's task.

---

# Custom Decorators

Custom decorators are used to reduce duplicate code and improve readability.

Files:

```text
decorators/
└── validateUser.ts
```

These decorators provide reusable functionality across controllers and guards.

---

# Request Processing Flow

When a user creates a task, the following process occurs:

```text
Client
  ↓
TaskController
  ↓
TaskService
  ↓
TaskSchema (Mongoose Model)
  ↓
MongoDB
  ↓
Response Returned
```

### Step 1

The client sends a request:

```http
POST /task
```

### Step 2

The request reaches `TaskController`.

### Step 3

The controller calls `TaskService`.

### Step 4

The service processes the request and interacts with the Mongoose model.

### Step 5

The model stores data in MongoDB.

### Step 6

MongoDB returns the result.

### Step 7

The response is sent back to the client.

---

# Conclusion

This project follows NestJS's modular architecture pattern. Controllers handle incoming requests, Services contain business logic, Schemas define database structures, and MongoDB stores application data. Authentication is implemented using JWT, while Guards provide authorization and route protection. This separation of concerns improves maintainability, scalability, and code organization.
