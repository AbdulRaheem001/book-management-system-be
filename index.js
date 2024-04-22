// app.js

import express from 'express';
import mongoose from 'mongoose';
import dbConnection from './dbConnection/db.js';
import authRouter from './router/authRouter.js'
import bookRouter from './router/bookRouter.js';
import shelfRouter from './router/shelfRouter.js';

import cors from 'cors';
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;

dbConnection();
app.use(cors({ origin: '*' }));
// Routes
app.use('/auth', authRouter);
app.use('/book', bookRouter);
app.use('/shelf', shelfRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});