# CareerSync - Academia-Industry Collaboration Platform

CareerSync is a comprehensive platform designed to bridge the gap between academia and industry. It empowers students with AI-driven skill mapping, connects top-tier verified talent with industry leaders, and provides institutions with real-time placement analytics.

## 🚀 Features

### For Students
- **AI-Driven Skill Mapping:** Analyze resumes instantly to identify skill gaps and receive personalized learning paths.
- **Resume Building:** Automatically generate ATS-friendly professional resumes based on verified skills and academic records.
- **Mock Interviews:** Practice technical and behavioral skills with an AI interviewer.
- **One-Click Apply:** Apply to top-tier verified internships and full-time positions with a single click.
- **Alumni Mentorship:** Connect with successfully placed alumni for 1-on-1 career guidance.

### For Institutions (TPOs)
- **Institutional Verification:** Securely verify student profiles and academic records.
- **Placement Analytics:** Track hiring pipelines, placement rates, and ongoing recruitment drives via real-time dashboards.

### For Employers
- **Smart Job Matching:** Advanced NLP algorithms automatically match job requirements with the most qualified campus talent.
- **Direct Recruitment:** Access a trusted, pre-verified talent pool directly from campuses.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Lucide React (Icons)
- **Backend:** Node.js, Express.js (REST API architecture)
- **Database:** MongoDB / Mongoose (or target DB)
- **Authentication:** Custom JWT / Role-based auth (Student, Employer, Institution)

## 📂 Project Structure

```
CareerSync/
├── Frontend/           # React + Vite Frontend
│   ├── public/         # Static assets & images
│   ├── src/
│   │   ├── components/ # Reusable UI components (Navbar, Footer, etc.)
│   │   ├── pages/      # Page components (Home, Login, Register, Dashboards)
│   │   ├── context/    # React Context (AuthContext)
│   │   ├── services/   # API calling services
│   │   └── App.jsx     # Main React App component
│   └── package.json    # Frontend dependencies
│
└── Backend/            # Node.js + Express Backend
    ├── routes/         # Express API Routes (auth, profile, jobs, etc.)
    ├── server.js       # Main entry point & Express setup
    └── package.json    # Backend dependencies
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### 1. Start the Backend
Navigate to the backend directory and start the server:
```bash
cd Backend
npm install
npm run dev
```
*(The backend runs on `http://localhost:5000`)*

### 2. Start the Frontend
Open a new terminal, navigate to the frontend directory, and start the Vite development server:
```bash
cd Frontend
npm install
npm run dev
```
*(The frontend runs on `http://localhost:5173`)*

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📜 License
This project is proprietary and built for capstone project purposes. All rights reserved.
