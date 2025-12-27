🚕 Cab Aggregator – Microservices Architecture

This project demonstrates a microservices-based backend architecture for a cab aggregator platform.

The system is divided into independent services, each responsible for a specific domain.
Every service manages its own logic, dependencies, and security, making the system scalable, secure, and easy to maintain.

🧩 Services Overview

The platform consists of the following core services:

👤 User Service

🚗 Captain Service

🛣️ Ride Service

Each service operates independently while communicating securely with others.

👤 User Service

The User Service manages everything related to a passenger using the platform.

Responsibilities

Allows users to register securely

Enables users to log in and start a session

Allows users to log out safely

Provides access to user profile information

Allows users to view details of accepted rides

Security & Protection

User passwords are securely stored using hashing

A token-based session is created during login

Once a user logs out, the session token is blacklisted

Blacklisted tokens cannot be reused, even if stolen

Profile and ride-related information is protected, ensuring only authenticated users can access it

Why This Matters

This ensures:

No unauthorized access to personal data

Sessions are properly invalidated after logout

Strong protection against token misuse

🚗 Captain Service

The Captain Service handles everything related to drivers on the platform.

Responsibilities

Allows captains to register and log in

Enables captains to log out securely

Provides access to captain profile details

Allows captains to toggle their working availability

Notifies captains when a new ride becomes available

Availability & Ride Notification

Captains can control whether they are available to accept rides

When available, the system waits for new ride requests

Ride details are shown instantly if a booking occurs within a short time window

If no ride appears, the request automatically expires

Security & Protection

All sensitive captain actions are protected

Only authenticated captains can change availability or receive ride information

Why This Matters

This ensures:

Only active captains receive ride requests

No unauthorized access to ride data

Real-time and controlled ride assignment flow

🛣️ Ride Service

The Ride Service is responsible for managing the lifecycle of a ride.

Responsibilities

Allows users to create rides

Allows captains to accept rides

Role-Based Protection

Ride creation is restricted to users only

Ride acceptance is restricted to captains only

The system strictly prevents:

Captains from creating rides

Users from accepting rides

Why This Matters

This ensures:

Clear separation of responsibilities

No role confusion or misuse

Strong enforcement of platform rules

🔐 Authentication & Safety Highlights

Secure session handling using tokens

Tokens are invalidated on logout

Protected actions require proper authentication

Role-based access prevents unauthorized operations

📌 Key Takeaways

Clean separation of services

Secure authentication flow

Clear role-based access control

Scalable and maintainable system design

Focused on real-world cab aggregator behavior

