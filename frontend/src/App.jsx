import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Compass, User, LogOut } from 'lucide-react';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ItineraryCreator from './pages/ItineraryCreator';
import ItineraryView from './pages/ItineraryView';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <Compass className="icon" color="var(--accent-color)" /> TravelAI
      </Link>
      <div className="nav-links">
        {token ? (
          <>
            <Link to="/dashboard" style={{ fontWeight: 600 }}>Dashboard</Link>
            <button onClick={handleLogout} className="btn-icon">
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <Link to="/auth">
            <button className="primary">Login <User size={18} /></button>
          </Link>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create" element={<ItineraryCreator />} />
            <Route path="/itinerary/:id" element={<ItineraryView />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
