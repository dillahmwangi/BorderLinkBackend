const express = require('express');
const app = express();
const docRoute = require('./src/Routes/docRoute');
const authRoutes = require('./src/Routes/auth');
const protectedRoute = require('./src/Routes/protectedRoute');
const cors = require("cors");




app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
app.use('/doc', docRoute);
const PORT = process.env.PORT || 3000;
const db = require('./src/Config/database');
require('dotenv').config();
app.listen(PORT, async() => {
console.log(`Server is running on port ${PORT}`);
await db.connect();

});