// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const { connectToDatabase } = require('./config/db');

// const authRoutes = require('./routes/auth');
// const courseRoutes = require('./routes/courses');
// const trialRoutes = require('./routes/trial');
// const reservationRoutes = require('./routes/reservation');

// const app = express();

// const PORT = process.env.PORT || 4000;
// const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5500';
// const CORS_ORIGINS = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
// const ALLOWED_ORIGINS = new Set([
//   CORS_ORIGIN,
//   ...CORS_ORIGINS,
//   'http://127.0.0.1:5500',
//   'http://localhost:5500'
// ].filter(Boolean));

// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin) return callback(null, true); // non-browser or same-origin
//     if (ALLOWED_ORIGINS.has(origin)) {
//       return callback(null, true);
//     }
//     console.warn('[CORS][BLOCKED]', origin);
//     return callback(new Error('Not allowed by CORS'));
//   },
//   credentials: true
// }));
// app.use(express.json());
// app.use(cookieParser());

// app.get('/api/health', (_req, res) => {
//   res.json({ ok: true, uptime: process.uptime(), allowedOrigins: Array.from(ALLOWED_ORIGINS) });});

// app.use('/api/auth', authRoutes);
// app.use('/api/courses', courseRoutes);
// app.use('/api/trials', trialRoutes);
// app.use('/api/reservations', reservationRoutes);

// // Global error handler
// app.use((err, _req, res, _next) => {
//   console.error(err);
//   const status = err.message && err.message.includes('CORS') ? 403 : (err.status || 500);
//   res.status(status).json({ error: err.message || 'Internal Server Error' });
// });

// connectToDatabase()
//   .then(() => {
//     app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
//   })
//   .catch((err) => {
//     console.error('Failed to start server:', err);
//     process.exit(1);
//   });


const path = require('path');
require('dotenv').config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectToDatabase } = require('./config/db');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const trialRoutes = require('./routes/trial');
const reservationRoutes = require('./routes/reservation');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS configuration - Allow all origins in production, or specify your frontend URL
const allowedOrigins = [
  'https://spellvoc.netlify.app',
  'https://www.spellvoc.netlify.app',
  'http://localhost:4000',
  'http://localhost:5500',
  'http://127.0.0.1:4000',
  'http://127.0.0.1:5500'
];

app.use(cors({ 
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or allow all in development
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return callback(null, true);
    }
    
    callback(null, true); // Allow all for now - you can restrict this later
  },
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// API routes (should come BEFORE static files)
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/trials', trialRoutes);
app.use('/api/reservations', reservationRoutes);

// Serve frontend static files
const publicPath = path.join(__dirname, '../public');
console.log('Serving static files from:', publicPath);
app.use(express.static(publicPath));

// Serve index.html for root route
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Catch-all route for SPA (must be last, after error handler)
app.get('*', (req, res) => {
  // Don't serve HTML for API routes
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  res.sendFile(path.join(publicPath, 'index.html'));
});

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
