import  express from 'express';
const app = express();
import docRoute from './src/Routes/docRoute.js';
import authRoutes from './src/Routes/auth.js';
import protectedRoute from './src/Routes/protectedRoute.js';
import newsRoutes from './src/Routes/news.js'
import cors from "cors";
import currenciesRoutes from "./src/Routes/currencyconverter.js"
import dotenv from 'dotenv';




app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/protected', protectedRoute);
app.use('/doc', docRoute);
app.use('/news', newsRoutes)
app.use('/currency', currenciesRoutes)

app.get('/', (req, res) =>{
    res.send("Hello Dillah its working")
})

const PORT = process.env.PORT || 4000;
import  connect from './src/Config/database.js';
dotenv.config()
app.listen(PORT, async() => {
console.log(`Server is running on port ${PORT}`);
await connect();

});