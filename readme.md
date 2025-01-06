# Transaction Management System

Live URL - http://3.110.28.184:80
Docker Hub Image: https://hub.docker.com/r/mohdjami/orbit-wallet
Postman API Documentation - https://documenter.getpostman.com/view/26354863/2sAYJ9BJq3

A modern Node.js API for managing user transactions with advanced filtering and pagination capabilities.

## Features

- User management with MongoDB
- Transaction tracking and filtering
- Advanced pagination
- Aggregation pipelines for complex queries
- TypeScript support
- Comprehensive test suite
- Automated CI/CD pipeline with GitHub Actions
- Docker containerization
- Automated deployment to AWS EC2

## Prerequisites

- Node.js (v20 or higher)
- pnpm
- MongoDB

## Installation

1. Clone the repository:
```bash
git clone git@github.com:mohdjami/transaction-management-system.git
cd transaction-management-system

## Deployment

The application uses GitHub Actions for continuous integration and deployment:

1. On push to the main branch, the workflow:
   - Builds a Docker image
   - Pushes it to Docker Hub
   - Deploys to AWS EC2 automatically
