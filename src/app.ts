import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import { AppError } from './utils/errors';
import l from './utils/logger';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  max: parseInt(process.env.RATE_LIMIT_MAX || '100')
});
app.use('/api', limiter);

// Database connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => l.info('Connected to MongoDB'))
  .catch((err) => l.error('MongoDB connection error:', err));

// Routes will go here
app.get('/',(req:Request, res:Response)=>{
  res.json({
    message: "Everything looks good!!"
  })
})

// Global error handler
const errorHandler: ErrorRequestHandler = (err, req, res, _next): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
    return;
  }

  l.error('Unhandled error:', err);
  res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
};

app.use(errorHandler);

export default app;