import express from 'express';
import connectDB from './configs/database.js';
import userRouter from './routes/user.route.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/user', userRouter);

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
