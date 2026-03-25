import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Map, Clock, Shield } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="animate-fade-in text-center mt-2">
      <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Travel Planning, Evolved</h1>
      <p style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem auto', color: 'var(--text-secondary)' }}>
        Experience the future of travel with AI-driven, hyper-personalized itineraries designed specifically for your preferences and budget.
      </p>
      <Link to="/auth">
        <button className="primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Start Your Journey <Sparkles size={20} />
        </button>
      </Link>

      <div className="grid grid-3" style={{ marginTop: '5rem', textAlign: 'left' }}>
        <div className="card">
          <Map className="mb-1" size={32} color="var(--accent-color)" />
          <h3>Personalized Routes</h3>
          <p>Our AI analyzes millions of data points to craft a route tailored exclusively to you.</p>
        </div>
        <div className="card">
          <Clock className="mb-1" size={32} color="var(--accent-color)" />
          <h3>Streamlined Process</h3>
          <p>Save hours of research. Get a complete, optimized itinerary in seconds.</p>
        </div>
        <div className="card">
          <Shield className="mb-1" size={32} color="var(--accent-color)" />
          <h3>Privacy First</h3>
          <p>Your data is secured with industry-leading measures. Travel with peace of mind.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
