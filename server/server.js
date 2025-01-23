import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);
console.log(typeof MONGODB_URI);


export async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI)
        const connection = mongoose.connection;

        connection.on('error', (err) => {
            console.log('MongoDB Connection Error: ', err);
            process.exit(1);
        });
        connection.on('connected', () => {
            console.log('MongoDB Connected');
        }
        );
    }
    catch (err) {
        console.log(err);
    }
};
connectDB();