import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowLeft } from 'lucide-react';

const ItineraryView = () => {
  const location = useLocation();
  const itinerary = location.state?.itinerary;

  if (!itinerary) {
    return (
      <div className="text-center mt-2 animate-fade-in">
        <h2>Itinerary not found</h2>
        <Link to="/dashboard"><button className="primary mt-1">Go Back</button></Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={18} /> Back to Dashboard
      </Link>
      
      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <MapPin color="var(--accent-color)" size={32} /> {itinerary.destination}
        </h1>
        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={18}/> {itinerary.dates}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'capitalize' }}>Budget: {itinerary.budget}</span>
        </div>
      </div>

      <div className="flex-column" style={{ gap: '2rem' }}>
        {itinerary.plan.map((dayPlan, idx) => (
          <div key={idx} className="card" style={{ padding: '1.5rem 2rem' }}>
            <h3 style={{ borderBottom: '1px solid var(--surface-border)', paddingBottom: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-color)' }}>
              Day {dayPlan.day}
            </h3>
            <div className="flex-column" style={{ gap: '1.5rem' }}>
              {dayPlan.activities.map((activity, aIdx) => (
                <div key={aIdx} style={{ display: 'flex', gap: '1.5rem' }}>
                  <div style={{ minWidth: '85px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', fontWeight: '500' }}>
                    <Clock size={16} style={{ marginTop: '0.15rem' }} /> {activity.time}
                  </div>
                  <div style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', padding: '0.75rem 1rem', borderRadius: '6px' }}>
                    {activity.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryView;
