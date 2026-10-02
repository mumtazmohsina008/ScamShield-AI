import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { config, hasValidApiKey } from './config/index.js';
import analyzeRouter from './routes/analyze.js';
import dashboardRouter from './routes/dashboard.js';
import healthRouter from './routes/health.js';

const app = express();

// Trust proxy for rate limiting when behind reverse proxy
app.set('trust proxy', 1);

// CORS configuration
app.use(
  cors({
    origin: config.corsOrigin === '*' ? true : config.corsOrigin,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parsing with safety size limit
app.use(express.json({ limit: '200kb' }));

// Rate Limiter: max 60 requests per 15 minutes
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Rate Limit Exceeded',
    message: 'Too many analysis requests from this IP. Please try again after 15 minutes.',
  },
});

app.use('/api/', apiLimiter);

// API Routes
app.use('/api', healthRouter);
app.use('/api/analyze', analyzeRouter);
app.use('/api/dashboard', dashboardRouter);

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'ScamShield AI Backend API',
    version: '1.0.0',
    status: 'active',
    documentation: '/api/health',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Endpoint ${req.method} ${req.url} does not exist.`,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong on the server.',
  });
});

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`🛡️  ScamShield AI Backend Server Running`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🤖 Gemini AI Configured: ${hasValidApiKey() ? 'YES (Live API Active)' : 'NO (Demo Mode Active)'}`);
  console.log(`🧠 Model: ${config.geminiModel}`);
  console.log(`💡 Demo Fallback Enabled: ${config.demoMode ? 'YES' : 'NO'}`);
  console.log(`=================================================\n`);
});
