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
