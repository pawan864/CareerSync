# CareerSync

CareerSync is an integrated platform built to streamline the connection between academic institutions, students, and industry recruiters. The system provides distinct, role-based workspaces designed to manage campus placements, facilitate corporate recruitment, and support student career development.

## Architecture & Technology Stack

The application is built on the MERN stack, focusing on performance, modularity, and a clean user experience.

- **Frontend Environment**: React, Vite, Tailwind CSS, Framer Motion
- **Backend Environment**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **State Management & Routing**: React Context API, React Router
- **Authentication**: JSON Web Tokens (JWT) with multi-level role-based access control (RBAC)

## Core Modules

### 1. Multi-Role Authentication System
A centralized authentication gateway that securely routes users to distinct, isolated portals based on their account type:
- **Student**: Access to career resources and applications.
- **Faculty**: Academic management and student oversight.
- **Training and Placement Officer (TPO)**: Institutional placement tracking and administration.
- **Recruiter**: Candidate sourcing and pipeline management.
- **Admin**: System-wide configuration and technical support handling.

### 2. Student Workspace
- **Opportunity Hub**: A centralized board for discovering and applying to internships and full-time positions.
- **Profile & Resume Builder**: Tools for maintaining professional profiles and structuring academic records.
- **Application Tracker**: Real-time status monitoring for active job applications and interview schedules.
- **Skill Center & Certifications**: Interfaces for skill mapping and maintaining verifiable credentials.
- **Alumni Network**: Directory for connecting with previously placed graduates and industry mentors.

### 3. Institutional & Employer Workspaces
- **Recruiter Interface**: Workflows for posting opportunities, reviewing candidate pipelines, and scheduling interviews.
- **TPO Interface**: Analytics and reporting interfaces for tracking institutional placement metrics and student success rates.
- **Faculty Interface**: Workflows for verifying student academic records and providing academic endorsements.

## Development Setup

### Prerequisites
- Node.js (v16.0 or higher)
- MongoDB instance (local or Atlas)

### Backend Configuration
1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (ensure a `.env` file exists containing the required `MONGO_URI` and `JWT_SECRET`).
4. Start the development server:
   ```bash
   npm run dev
   ```
   *The backend service runs on port 5000 by default.*

### Frontend Configuration
1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend client runs on port 5173 by default.*

## Project Structure

```text
CareerSync/
├── Frontend/
│   ├── public/              # Static assets and media
│   ├── src/
│   │   ├── components/      # Reusable UI elements (Navbar, Footer, Modals)
│   │   ├── context/         # AuthContext and state providers
│   │   ├── pages/           # Route views (Login, Register, Home)
│   │   │   ├── admin/       # Admin-specific views
│   │   │   ├── student/     # Student-specific dashboards and tools
│   │   │   └── ...          
│   │   └── App.jsx          # Application routing configuration
│   └── package.json
└── Backend/
    ├── routes/              # Express API endpoint definitions
    ├── models/              # Mongoose database schemas
    ├── server.js            # Express application entry point
    └── package.json
```
