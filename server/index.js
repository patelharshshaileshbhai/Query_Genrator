import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


const app = express();

// Connect Database
import connectDB from './config/db.js';
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
import authRoutes from './routes/authRoutes.js';
import queryRoutes from './routes/queryRoutes.js';
app.use('/api/auth', authRoutes);
app.use('/api', queryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));