<div align="center">
  <h1>CareerSync</h1>
  <p><strong>Bridging the Gap Between Academia and Industry</strong></p>

  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
  ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
</div>

<br />

> [!NOTE]
> **CareerSync** is an integrated platform built to streamline the connection between academic institutions, students, and industry recruiters. The system provides distinct, role-based workspaces designed to manage campus placements, facilitate corporate recruitment, and support student career development.

---

## 🏗️ Architecture & Technology Stack

The application is built on the MERN stack, focusing on performance, modularity, and a clean user experience.

| Tier | Technologies | Description |
| :--- | :--- | :--- |
| **Frontend** | `React`, `Vite`, `Tailwind CSS`, `Framer Motion` | High-performance, animated, and responsive client interface. |
| **Backend** | `Node.js`, `Express.js` | RESTful API architecture handling routing and business logic. |
| **Database** | `MongoDB`, `Mongoose ODM` | NoSQL data store with strict schema validation. |
| **Security** | `JSON Web Tokens (JWT)`, `Bcrypt` | Multi-level Role-Based Access Control (RBAC) and data encryption. |

---

## 👥 User Roles & Workspaces

The platform features a centralized authentication gateway that securely routes users to one of five distinct, isolated portals based on their account type.

<details>
<summary><b>1. Student Portal</b> <i>(Click to expand)</i></summary>
<br/>
A comprehensive career development and job application environment.
<ul>
  <li><b>Opportunity Hub:</b> A centralized board for discovering and applying to internships and full-time positions.</li>
  <li><b>Profile & Resume Builder:</b> Tools for maintaining professional profiles and structuring academic records into ATS-friendly resumes.</li>
  <li><b>Application Tracker:</b> Real-time status monitoring for active job applications and interview schedules.</li>
  <li><b>Skill Center:</b> Interfaces for skill mapping, assessments, and maintaining verifiable credentials.</li>
  <li><b>Alumni Network:</b> Directory for connecting with previously placed graduates and industry mentors.</li>
</ul>
</details>

<details>
<summary><b>2. Faculty Portal</b> <i>(Click to expand)</i></summary>
<br/>
An academic oversight environment designed for professors and department heads.
<ul>
  <li><b>Academic Verification:</b> Workflows for verifying student academic records and providing endorsements.</li>
  <li><b>Student Mentorship:</b> Tracking and guiding student career trajectories.</li>
</ul>
</details>

<details>
<summary><b>3. Training and Placement Officer (TPO) Portal</b> <i>(Click to expand)</i></summary>
<br/>
An institutional management interface for overseeing campus recruitment drives.
<ul>
  <li><b>Placement Analytics:</b> Real-time reporting interfaces for tracking institutional placement metrics.</li>
  <li><b>Recruiter Relations:</b> Managing corporate partnerships and coordinating campus recruitment events.</li>
</ul>
</details>

<details>
<summary><b>4. Recruiter Portal</b> <i>(Click to expand)</i></summary>
<br/>
A corporate hiring interface for sourcing talent directly from academic institutions.
<ul>
  <li><b>Job Management:</b> Workflows for posting opportunities and setting applicant requirements.</li>
  <li><b>Pipeline Review:</b> Tools for reviewing candidate pipelines, filtering verified profiles, and scheduling interviews.</li>
</ul>
</details>

<details>
<summary><b>5. Admin Portal</b> <i>(Click to expand)</i></summary>
<br/>
A top-level system administration and support environment.
<ul>
  <li><b>System Configuration:</b> Global platform settings and user management.</li>
  <li><b>Technical Support:</b> Interface for resolving user support tickets and maintaining platform integrity.</li>
</ul>
</details>

---

## ⚙️ Development Setup

> [!IMPORTANT]
> Ensure you have **Node.js (v16.0+)** and a running instance of **MongoDB** (local or Atlas) before proceeding.

### Backend Configuration
```bash
# Navigate to the backend directory
cd Backend

# Install dependencies
npm install

# Start the development server
npm run dev
```
> [!TIP]
> **Environment Variables:** Ensure a `.env` file exists in the Backend directory containing your `MONGO_URI` and `JWT_SECRET`. The backend service runs on port `5000` by default.

### Frontend Configuration
```bash
# Navigate to the frontend directory
cd Frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
> [!TIP]
> The frontend client runs on port `5173` by default.

---

## 📂 Project Structure

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
