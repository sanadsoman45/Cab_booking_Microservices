# 🚕 Cab Aggregator – Microservices Architecture

A production-ready microservices-based backend architecture for a cab aggregator platform. The system is split into independent services, each responsible for a specific domain, enabling **scalability**, **security**, and **maintainability**.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Services Architecture](#-services-architecture)
  - [User Service](#-user-service)
  - [Captain Service](#-captain-service)
  - [Ride Service](#-ride-service)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Prerequisites](#-prerequisites)
- [Setup Instructions](#-setup-instructions)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Gateway](#-api-gateway)
- [Security Highlights](#-security-highlights)
- [Contributing](#-contributing)

---

## 🎯 Overview

This project demonstrates a **microservices-based backend architecture** for a cab aggregator platform, similar to Uber or Lyft. The system consists of three core services that operate independently while communicating securely through **REST APIs** and **RabbitMQ** message queuing.

### Architecture Highlights

✅ **Clear separation of concerns** across services  
✅ **Secure authentication** and session management  
✅ **Strict role-based access control**  
✅ **Scalable and maintainable** codebase  
✅ **Real-time ride matching** and notifications  
✅ **Dockerized deployment** for consistency

---

## 🧩 Services Architecture

The platform consists of three core services that operate independently while communicating securely:

### 👤 User Service

Manages everything related to **passengers** using the platform.

#### Responsibilities

- 📝 User registration and secure authentication
- 🔐 Session-based login and logout
- 👨‍💼 Access to user profile details
- 🚖 Viewing accepted ride information

#### Security & Protection

- 🔒 Passwords stored securely using **bcrypt hashing**
- 🎫 **Token-based sessions** created on login
- 🚫 Tokens **blacklisted** on logout and cannot be reused
- 🛡️ Profile and ride data accessible only to **authenticated users**

#### Why This Matters

✔️ Prevents unauthorized access to personal data  
✔️ Ensures sessions are properly invalidated  
✔️ Protects against token misuse

---

### 🚗 Captain Service

Handles all **driver-related** functionality.

#### Responsibilities

- 📝 Captain registration and login
- 🔐 Secure logout functionality
- 👨‍✈️ Access to captain profile details
- 🟢 Toggle working availability status
- 📬 Receive notifications for new ride requests

#### Availability & Ride Notification

- Captains control when they are **available** to accept rides
- When available, the system **listens** for new ride requests
- Ride details are delivered **instantly** within a short time window
- Requests **expire automatically** if no ride is assigned

#### Security & Protection

- 🔐 All sensitive actions are **protected**
- 🎫 Only **authenticated captains** can change availability
- 🛡️ Only authenticated captains can receive ride data

#### Why This Matters

✔️ Ensures only active captains receive ride requests  
✔️ Prevents unauthorized access to ride information  
✔️ Enables real-time and controlled ride assignment

---

### 🛣️ Ride Service

Responsible for managing the **ride lifecycle**.

#### Responsibilities

- 🆕 Ride creation by users
- ✅ Ride acceptance by captains
- 🔄 Complete ride lifecycle management

#### Role-Based Protection

- 👤 **Only users** can create rides
- 🚗 **Only captains** can accept rides
- 🚫 Prevents role misuse and unauthorized actions

#### Why This Matters

✔️ Maintains clear separation of responsibilities  
✔️ Enforces platform rules strictly  
✔️ Ensures system integrity

---

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| 🔐 **Secure Authentication** | JWT-based token authentication with bcrypt password hashing |
| 🎫 **Session Management** | Token blacklisting on logout prevents token reuse |
| 👥 **Role-Based Access Control** | Strict enforcement of user and captain permissions |
| 📡 **Real-Time Communication** | RabbitMQ message queue for instant ride notifications |
| 🐳 **Dockerized Services** | Each service runs in its own container for isolation |
| 🚪 **API Gateway** | Single entry point for all client requests |
| 📊 **MongoDB Database** | NoSQL database for flexible data storage |
| 🔄 **Scalable Architecture** | Independent services can scale horizontally |

---

## 🛠️ Technology Stack

| Component | Technology |
|-----------|-----------|
| **Runtime** | Node.js |
| **Database** | MongoDB |
| **Message Queue** | RabbitMQ |
| **Authentication** | JWT (JSON Web Tokens) |
| **Password Hashing** | bcrypt |
| **Containerization** | Docker & Docker Compose |
| **API Gateway** | Express.js |

---

## 📦 Prerequisites

Ensure the following are installed on your system:

- ✅ [Git](https://git-scm.com/)
- ✅ [MongoDB Compass](https://www.mongodb.com/products/compass) (GUI for MongoDB)
- ✅ [Docker](https://www.docker.com/)
- ✅ [Docker Compose](https://docs.docker.com/compose/)
- ✅ [Node.js](https://nodejs.org/) (optional - only if running services locally without Docker)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

If the repository is **not already present**:

```bash
git clone -b main https://github.com/sanadsoman45/Cab_booking_Microservices.git
cd Cab_booking_Microservices
```

If the project **already exists** locally:

```bash
git pull origin main
```

---

## ⚙️ Configuration

### 📁 Root `.env` (Infrastructure Services)

Create a `.env` file at the **project root**:

```env
# MongoDB
MONGO_ROOT_USER=your_mongo_username
MONGO_ROOT_PASSWORD=your_mongo_password

# RabbitMQ
RABBITMQ_USER=your_rabbitmq_username
RABBITMQ_PASSWORD=your_rabbitmq_password
```

---

### 📁 User Service (`/users/.env`)

```env
PORT=3001
JWT_SECRET=your_jwt_secret_key_here
```

---

### 📁 Captain Service (`/captain/.env`)

```env
PORT=3002
JWT_SECRET=your_jwt_secret_key_here
```

---

### 📁 Ride Service (`/ride/.env`)

```env
PORT=3003
JWT_SECRET=your_jwt_secret_key_here
BASE_URL=http://gateway:3000
```

---

### 📁 Gateway Service (`/gateway/.env`)

```env
PORT=3000
```

---

### ⚠️ Important Note

> **Ensure the same `JWT_SECRET` is used in:**
> - `users/.env`
> - `captain/.env`
> - `ride/.env`
>
> This is critical for authentication to work across services.

---

## 🐳 Docker Setup & Build

### 2️⃣ Build Docker Images

Navigate to each service folder and build the image using the name defined in `docker-compose.yml`.

**Example:**

```bash
cd users
docker build -t cab-booking-users .
cd ..
```

**Repeat this step for:**

- ✅ `users`
- ✅ `captain`
- ✅ `ride`
- ✅ `gateway`

---

### 3️⃣ Start All Services

From the **project root**, run:

```bash
docker compose up -d
```

This will start:

- 🗄️ **MongoDB** (Database)
- 🐰 **RabbitMQ** (Message Queue)
- 👤 **User Service**
- 🚗 **Captain Service**
- 🛣️ **Ride Service**
- 🚪 **API Gateway**

---

### ✅ Verify Containers

Check if all containers are running:

```bash
docker ps
```

You should see all services listed and running.

---

## 🧪 Running the Application

### 🚪 API Gateway

The **API Gateway** will be available on the port defined in `gateway/.env` (default: `3000`).

All client requests should go through the Gateway:

```
http://localhost:3000
```

### 📡 Service Endpoints

| Service | Internal Port | Access Via Gateway |
|---------|--------------|-------------------|
| **User Service** | 3001 | `http://localhost:3000/users/*` |
| **Captain Service** | 3002 | `http://localhost:3000/captains/*` |
| **Ride Service** | 3003 | `http://localhost:3000/rides/*` |

---

## 🔐 Security Highlights

| Security Feature | Implementation |
|-----------------|----------------|
| 🔒 **Password Security** | Bcrypt hashing with salt rounds |
| 🎫 **Token-Based Auth** | JWT tokens for stateless authentication |
| 🚫 **Token Blacklisting** | Invalidated tokens stored and checked |
| 🛡️ **Protected Routes** | Middleware authentication on sensitive endpoints |
| 👥 **Role-Based Access** | Strict separation between user and captain actions |
| 🔐 **Environment Variables** | Sensitive credentials stored securely |

---

## 📌 Key Takeaways

✨ **Clear separation of services** for maintainability  
🔐 **Secure authentication** and session management  
👮 **Strict role-based** access control  
📈 **Scalable architecture** ready for production  
🚕 **Real-world cab aggregator** behavior and patterns  

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

**Sanad Soman**

- GitHub: [@sanadsoman45](https://github.com/sanadsoman45)

---

## 🙏 Acknowledgments

- Thanks to all contributors who helped build this project
- Inspired by modern cab aggregator platforms
- Built with best practices in microservices architecture

---

<div align="center">

### ⭐ If you found this project helpful, please give it a star!

Made with ❤️ by [Sanad Soman](https://github.com/sanadsoman45)

</div>
