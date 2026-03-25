import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

const ItineraryCreator = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('moderate');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('token');
    
    try {
      await axios.post('http://localhost:5000/api/generate', 
        { destination, days, budget, interests },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Wait a moment for visual effect of AI processing
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert('Failed to generate itinerary. Please try again.');
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card">
        <h2>Generate Itinerary <span style={{fontSize: '1rem', fontWeight: 'normal', color: 'var(--accent-color)'}}>(AI Powered)</span></h2>
        <p className="mb-2" style={{ color: 'var(--text-secondary)' }}>Tell us about your trip and we'll craft the perfect plan.</p>
        
        <form onSubmit={handleSubmit} className="flex-column">
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Destination</label>
            <input 
              type="text" 
              placeholder="e.g. Tokyo, Paris, Bali" 
              value={destination} 
              onChange={e => setDestination(e.target.value)} 
              required 
            />
          </div>
          <div className="grid grid-2" style={{ gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Duration (Days)</label>
              <input 
                type="number" 
                min="1" 
                max="14"
                value={days} 
                onChange={e => setDays(e.target.value)} 
                required 
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Budget Level</label>
              <select value={budget} onChange={e => setBudget(e.target.value)}>
                <option value="budget">Budget / Backpacker</option>
                <option value="moderate">Moderate</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Specific Interests (Optional)</label>
            <textarea 
              rows="3" 
              placeholder="e.g. historical architecture, local street food, art museums..." 
              value={interests} 
              onChange={e => setInterests(e.target.value)} 
            />
          </div>

          <button type="submit" className="primary mt-1" disabled={loading}>
            {loading ? <><Loader2 className="spinner" size={18} /> Consulting AI...</> : 'Generate Itinerary'}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .spinner { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default ItineraryCreator;
