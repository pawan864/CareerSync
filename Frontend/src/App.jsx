import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import Register from './pages/Register';
import Support from './pages/Support';
import Profile from './pages/Profile';
import SkillGap from './pages/SkillGap';
import JobBoard from './pages/JobBoard';
import EmployerDashboard from './pages/EmployerDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentDashboard from './pages/student/StudentDashboard';

import InstitutionDashboard from './pages/InstitutionDashboard';
import ForgotPassword from './pages/ForgotPassword';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/Footer';

const AppContent = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forgot-password' || location.pathname === '/support' || location.pathname === '/admin-login' || location.pathname === '/otp-verify' || location.pathname === '/student-dashboard' || location.pathname === '/admin-dashboard' || location.pathname === '/faculty-dashboard';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow flex flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/register" element={<Register />} />
                <Route path="/support" element={<Support />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skill-gap" element={<SkillGap />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />

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
