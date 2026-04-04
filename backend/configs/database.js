import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);
		console.log('db connected');
		return conn;
	} catch (error) {
		console.error('DB connection failed');
		console.error(error);
		process.exit(1);
	}
};

export default connectDB;
