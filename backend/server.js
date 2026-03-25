require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDb } = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Middleware to verify JWT
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// Register
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await getDb();
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.run('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(400).json({ error: 'User already exists or bad request' });
    }
});

// Login
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const db = await getDb();
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
            res.json({ token, email: user.email });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Generate Itinerary (Mock AI for MVP)
app.post('/api/generate', authenticate, async (req, res) => {
    const { destination, days, budget, interests } = req.body;
    
    // Provide a more personalized experience by generating location-specific data
    const destName = (destination || 'Your Destination').trim();
    const destKey = destName.toLowerCase();
    
    // Top cities have hardcoded iconic spots for demonstration, with a dynamic fallback
    const landmarks = {
        paris: ['Eiffel Tower', 'Louvre Museum', 'Luxembourg Gardens', 'Palace of Versailles'],
        london: ['Tower of London', 'British Museum', 'Hyde Park', 'Buckingham Palace'],
        tokyo: ['Senso-ji Temple', 'Tokyo National Museum', 'Shinjuku Gyoen National Garden', 'Tokyo Imperial Palace'],
        delhi: ['Red Fort', 'National Museum, New Delhi', 'Lodhi Gardens', 'Rashtrapati Bhavan'],
        rome: ['Colosseum', 'Vatican Museums', 'Villa Borghese', 'Palatine Hill'],
        'new york': ['Statue of Liberty', 'Metropolitan Museum of Art', 'Central Park', 'Grand Central Terminal']
    };
    
    // Fallback creates dynamic, plausible location names for unmapped entries
    const cityLandmarks = landmarks[destKey] || [
        `${destName} Historic Monument`, 
        `${destName} Heritage Museum`, 
        `Central ${destName} Park`, 
        `The Grand Palace of ${destName}`
    ];

    const mockPlan = Array.from({ length: parseInt(days) || 3 }).map((_, i) => {
        // Rotate through places to ensure day-to-day variety
        const monument = cityLandmarks[i % cityLandmarks.length] || cityLandmarks[0];
        const museum = cityLandmarks[(i + 1) % cityLandmarks.length] || cityLandmarks[1];
        const park = cityLandmarks[(i + 2) % cityLandmarks.length] || cityLandmarks[2];
        const palace = cityLandmarks[(i + 3) % cityLandmarks.length] || cityLandmarks[3];

        return {
            day: i + 1,
            activities: [
                { time: '09:00 AM', description: `Refreshments and local coffee at a highly rated cafe in ${destName}.` },
                { time: '10:30 AM', description: `Morning visit to the iconic ${monument}. Take time to explore the historic architecture.` },
                { time: '01:00 PM', description: `Enjoy a classic ${budget || 'moderate'} budget lunch nearby.` },
                { time: '02:30 PM', description: `Relaxing afternoon stroll and photography through ${park}.` },
                { time: '04:00 PM', description: `Immersive cultural tour at ${palace} or ${museum}.` },
                { time: '07:30 PM', description: `Dinner at an authentic ${destName} restaurant, aligning with your interest in "${interests || 'local cuisine'}".` }
            ]
        };
    });

    try {
        const db = await getDb();
        const planStr = JSON.stringify(mockPlan);
        const datesStr = `${days} days`; 
        
        await db.run(
            'INSERT INTO itineraries (user_id, destination, dates, budget, plan_json) VALUES (?, ?, ?, ?, ?)',
            [req.user.id, destination, datesStr, budget || 'moderate', planStr]
        );
        res.json({ plan: mockPlan });
    } catch (err) {
        res.status(500).json({ error: 'Failed to generate itinerary' });
    }
});

// Get user itineraries
app.get('/api/itineraries', authenticate, async (req, res) => {
    try {
        const db = await getDb();
        const rows = await db.all('SELECT * FROM itineraries WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
        
        const itineraries = rows.map(r => ({
            ...r,
            plan: JSON.parse(r.plan_json)
        }));
        res.json(itineraries);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
