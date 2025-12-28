🚕 Cab Aggregator – Microservices Architecture

This project demonstrates a microservices-based backend architecture for a cab aggregator platform.
The system is split into independent services, each responsible for a specific domain, enabling scalability, security, and maintainability.

🧩 Services Overview

The platform consists of three core services that operate independently while communicating securely:

👤 User Service

🚗 Captain Service

🛣️ Ride Service

👤 User Service

Manages everything related to passengers using the platform.

Responsibilities

User registration and secure authentication

Session-based login and logout

Access to user profile details

Viewing accepted ride information

Security & Protection

Passwords are stored securely using hashing

Token-based sessions are created on login

Tokens are blacklisted on logout and cannot be reused

Profile and ride data is accessible only to authenticated users

Why This Matters

Prevents unauthorized access to personal data

Ensures sessions are properly invalidated

Protects against token misuse

🚗 Captain Service

Handles all driver-related functionality.

Responsibilities

Captain registration and login

Secure logout

Access to captain profile details

Toggle working availability

Receive notifications for new ride requests

Availability & Ride Notification

Captains control when they are available to accept rides

When available, the system listens for new ride requests

Ride details are delivered instantly within a short time window

Requests expire automatically if no ride is assigned

Security & Protection

All sensitive actions are protected

Only authenticated captains can change availability or receive ride data

Why This Matters

Ensures only active captains receive ride requests

Prevents unauthorized access to ride information

Enables real-time and controlled ride assignment

🛣️ Ride Service

Responsible for managing the ride lifecycle.

Responsibilities

Ride creation by users

Ride acceptance by captains

Role-Based Protection

Only users can create rides

Only captains can accept rides

Prevents role misuse and unauthorized actions

Why This Matters

Maintains clear separation of responsibilities

Enforces platform rules strictly

Ensures system integrity

🔐 Authentication & Safety Highlights

Secure token-based session handling

Tokens are invalidated on logout

Protected actions require proper authentication

Strong role-based access control

📌 Key Takeaways

Clear separation of services

Secure authentication and session management

Strict role-based access control

Scalable and maintainable architecture

Designed around real-world cab aggregator behavior

🛠️ Project Setup Guide – Cab Booking Microservices

This project is a Dockerized microservices-based Cab Booking System consisting of multiple services communicating via REST and RabbitMQ.

📦 Prerequisites

Ensure the following are installed on your system:

Git

MongoDB Compass (GUI for connecting to MongoDB)

Docker

Docker Compose

Node.js (only if running services locally without Docker)

🚀 Setup Instructions
1️⃣ Clone the Repository

If the repository is not already present:

git clone -b main https://github.com/sanadsoman45/Cab_booking_Microservices.git
cd Cab_booking_Microservices

If the project already exists locally:

git pull origin main

📁 Root .env (Infrastructure Services)

Create a .env file at the project root:

# MongoDB
MONGO_ROOT_USER=
MONGO_ROOT_PASSWORD=

# RabbitMQ
RABBITMQ_USER=
RABBITMQ_PASSWORD=

📁 users service (/users/.env)
PORT=
JWT_SECRET=

📁 gateway service (/gateway/.env)
PORT=

📁 ride service (/ride/.env)
PORT=
JWT_SECRET=
BASE_URL=

📁 captain service (/captain/.env)
PORT=
JWT_SECRET=


✅ Ensure the same JWT_SECRET is used in:

users

ride

captain

🐳 Docker Setup & Build
2️⃣ Build Docker Images

Navigate to each service folder and build the image using the name defined in docker-compose.yml.

Example:

docker build -t <image_name_from_compose_file> .


Repeat this step for:

users

ride

captain

gateway

3️⃣ Start All Services

From the project root, run:

docker compose up -d


This will start:

MongoDB

RabbitMQ

All microservices

API Gateway

✅ Verify Containers
docker ps


Ensure all containers are running successfully.

🧪 Accessing the Application

API Gateway will be available on the port defined in gateway/.env

All requests should go through the Gateway


