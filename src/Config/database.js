import  mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

const connect = async () => {
    // connect to DB
    mongoose.set('strictQuery', false);
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    const mongodbUri = process.env.mongoDBUri;
    await mongoose.connect(mongodbUri, mongoOptions);
    const conn = mongoose.connection;
    conn.on('error', console.error.bind(console, 'connection error:'));
};

export default connect