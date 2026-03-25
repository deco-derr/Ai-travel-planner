import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Plus, Calendar, MapPin } from 'lucide-react';

const Dashboard = () => {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItineraries = async () => {
      const token = localStorage.getItem('token');
      if (!token) return navigate('/auth');
      
      try {
        const { data } = await axios.get('http://localhost:5000/api/itineraries', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setItineraries(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchItineraries();
  }, [navigate]);

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Your Dashboard</h2>
        <Link to="/create">
          <button className="primary"><Plus size={18}/> New Itinerary</button>
        </Link>
      </div>

      {itineraries.length === 0 ? (
        <div className="card text-center">
          <p style={{ color: 'var(--text-secondary)' }}>You haven't created any itineraries yet.</p>
        </div>
      ) : (
        <div className="grid grid-3">
          {itineraries.map(it => (
            <Link to={`/itinerary/${it.id}`} key={it.id} state={{ itinerary: it }}>
              <div className="card" style={{ cursor: 'pointer', height: '100%' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <MapPin size={18} color="var(--accent-color)" /> {it.destination}
                </h3>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
                  <Calendar size={16}/> {it.dates}
                </p>
                <div style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', padding: '0.5rem 0', borderTop: '1px solid var(--surface-border)' }}>
                  Budget: <span style={{ textTransform: 'capitalize', color: 'var(--text-primary)' }}>{it.budget}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
