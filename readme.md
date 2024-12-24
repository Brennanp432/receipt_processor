# Receipt Processor Built with ExpressJS/TypeScript/Docker

This project is an Express.js API built with TypeScript, packaged in a Docker container. The API serves as an example of how to set up an Express application in a TypeScript environment and deploy it using Docker.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Production Readiness Checklist](#production-readiness-checklist)

## Prerequisites

Before running this project, make sure you have the following installed on your local machine:

- **Docker**: [Install Docker](https://www.docker.com/get-started)
- **Node.js** (for building dependencies, though Docker handles this): [Install Node.js](https://nodejs.org/)

## Installation & Setup

1. **Clone the Repository**

2. **Build Docker Image**
   docker build -t receipt_processor_patrickbrennan

3. **Run Docker Image**
   docker run -p 3000:3000 receipt_processor_patrickbrennan

This will start the API, and you can access it at http://localhost:3000.

### Production Readiness Checklist

1. Security
   Environment Variables: Use environment variables for sensitive data (e.g., API keys, DB credentials).
   Secure Headers: Implement HTTP security headers using libraries like helmet.
   Rate Limiting: Use libraries like express-rate-limit to prevent abuse and DoS attacks.
   Error Handling: Proper error handling to prevent exposing sensitive information in production.
2. Input Validation
   Sanitization: Validate and sanitize all incoming data using libraries like express-validator.
   Schema Validation: Use libraries like Joi or zod to define and validate request schemas.
3. Testing & Code Coverage
   Unit Tests: Write unit tests for critical business logic.
   Integration Tests: Ensure end-to-end functionality works as expected.
   Code Coverage: Achieve adequate code coverage for unit and integration tests.
