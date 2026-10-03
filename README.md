# CareerSync

CareerSync is an integrated platform built to streamline the connection between academic institutions, students, and industry recruiters. The system provides distinct, role-based workspaces designed to manage campus placements, facilitate corporate recruitment, and support student career development.

## Architecture & Technology Stack

The application is built on the MERN stack, focusing on performance, modularity, and a clean user experience.

- **Frontend Environment**: React, Vite, Tailwind CSS, Framer Motion
- **Backend Environment**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **State Management & Routing**: React Context API, React Router
- **Authentication**: JSON Web Tokens (JWT) with multi-level role-based access control (RBAC)

## User Roles & Workspaces

The platform features a centralized authentication gateway that securely routes users to one of five distinct, isolated portals based on their account type:

### 1. Student Portal
A comprehensive career development and job application environment.
- **Opportunity Hub**: A centralized board for discovering and applying to internships and full-time positions.
- **Profile & Resume Builder**: Tools for maintaining professional profiles and structuring academic records into ATS-friendly resumes.
- **Application Tracker**: Real-time status monitoring for active job applications and interview schedules.
- **Skill Center & Certifications**: Interfaces for skill mapping, assessments, and maintaining verifiable credentials.
- **Alumni Network**: Directory for connecting with previously placed graduates and industry mentors.

### 2. Faculty Portal
An academic oversight environment designed for professors and department heads.
- **Academic Verification**: Workflows for verifying student academic records and providing academic endorsements.
- **Student Mentorship**: Tracking and guiding student career trajectories.

### 3. Training and Placement Officer (TPO) Portal
An institutional management interface for overseeing campus recruitment drives.
- **Placement Analytics**: Real-time reporting interfaces for tracking institutional placement metrics and student success rates.
- **Recruiter Relations**: Managing corporate partnerships and coordinating campus recruitment events.

### 4. Recruiter Portal
A corporate hiring interface for sourcing talent directly from academic institutions.
- **Job Management**: Workflows for posting opportunities and setting applicant requirements.
- **Pipeline Review**: Tools for reviewing candidate pipelines, filtering verified profiles, and scheduling interviews.

### 5. Admin Portal
A top-level system administration and support environment.
- **System Configuration**: Global platform settings and user management.
- **Technical Support Handling**: Interface for resolving user support tickets and maintaining platform integrity.

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
