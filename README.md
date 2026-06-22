# Authentication Backend

A secure, robust, and production-ready backend authentication system built using Node.js, Express, and PostgreSQL. This repository provides a clean architecture boilerplate for managing user registration, secure login sessions, role-based route protection, and cryptographic token verification.

## 🚀 Features

- **User Registration & Login:** Password hashing using `bcrypt`.  
- **JWT Authentication:** Secure token-based authorization via custom Express middleware.  
- **Role-Based Access Control (RBAC):** Restrict endpoint access based on account roles (e.g., Admin, User).  
- **Database Transaction Management:** Here I use a prisma ORM.  
- **Input Validation:** Safe payload verification to eliminate malformed requests before hitting the controllers.  
- **Centralized Error Handling:** Consistent HTTP error responses for easy frontend integration.  

## 🛠️ Tech Stack  

- **Runtime Environment:** Node.js (with TypeScript support)  
- **Framework:** Express.js  
- **Database:** PostgreSQL (using raw SQL query blocks or pg pool clients)  
- **Security:** JSON Web Tokens (JWT), bcryptjs  

---

## 📋 Prerequisites

Ensure you have the following installed on your machine:  
- [Node.js](https://nodejs.org/) (v16 or higher recommended)  
- [PostgreSQL](https://www.postgresql.org/) database server  

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone [https://github.com/Tina-Banik/authentication-backend.git](https://github.com/Tina-Banik/authentication-backend.git)  
cd authentication-backend  
