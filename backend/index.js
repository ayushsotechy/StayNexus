import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './configs/database.js';
import attendanceRouter from './routes/attendance.route.js';
import hostelCartRouter from './routes/hostelcart.route.js';
import userRouter from './routes/user.route.js';
import complaintRouter from './routes/complaint.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);
app.use(express.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/attendance', attendanceRouter);
app.use('/api/v1/hostelcart', hostelCartRouter);
app.use('/api/v1/complaint', complaintRouter);

app.get('/', (req, res) => {
	res.json({ status: 'hello from staynexus' });
});

const start = async () => {
	await connectDB();
	app.listen(port, () => {
		console.log(`Server running on port ${port}`);
	});
};

start();
