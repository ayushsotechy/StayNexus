import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.model.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
	const token = req.body.token || req.body.credential || req.body.id_token;
	if (!token) {
		return res.status(401).json({ msg: 'No Google token provided' });
	}

	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();
		const { email, name, sub } = payload;

		let user = await User.findOne({ email });

		if (!user) {
			const { roomNumber, hostelName } = req.body;
			if (!roomNumber || !hostelName) {
				return res.status(400).json({
					msg: 'roomNumber and hostelName are required for first-time Google login',
				});
			}

			user = await User.create({
				name,
				email,
				googleId: sub,
				roomNumber,
				hostelName,
			});
		} else if (!user.googleId) {
			user.googleId = sub;
			await user.save();
		}

		const customToken = user.createJWT();

		return res.status(200).json({
			user: {
				name: user.name,
				_id: user._id,
				email: user.email,
				roomNumber: user.roomNumber,
				hostelName: user.hostelName,
			},
			token: customToken,
		});
	} catch (error) {
		return res.status(401).json({
			msg: 'Invalid Google token',
			error: error.message || error,
		});
	}
};

export { googleLogin };
