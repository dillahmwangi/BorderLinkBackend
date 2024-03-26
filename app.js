import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { URL } from 'url';
import connect from './src/Config/database.js';
import bodyParser from 'body-parser';

// Import routes
import docRoute from './src/Routes/docRoute.js';
import authRoutes from './src/Routes/auth.js';
import protectedRoute from './src/Routes/protectedRoute.js';
import newsRoutes from './src/Routes/news.js';
import currenciesRoutes from './src/Routes/currencyconverter.js';
import smsRoutes from './src/Routes/sms.js';

// Get current filename and directory
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Serve static files from the uploads directory
app.use(express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
app.use('/doc', docRoute);
app.use('/news', newsRoutes);
app.use('/currency', currenciesRoutes);
app.use('/sms', smsRoutes);

// Default route
app.get('/', (req, res) => {
  res.send("Hello Dillah its working");
});

// Start server
const PORT = process.env.PORT || 4000;
dotenv.config();
app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connect();
});
