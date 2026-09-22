import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import SkillGap from './pages/SkillGap';
import JobBoard from './pages/JobBoard';
import EmployerDashboard from './pages/EmployerDashboard';
import InstitutionDashboard from './pages/InstitutionDashboard';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/institution" element={<InstitutionDashboard />} />
        </Routes>
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
