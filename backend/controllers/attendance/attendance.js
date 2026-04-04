import Attendance from '../../models/attendance/attendance.model.js';

// Fixed hostel reference point (update these coordinates to your hostel gate/center).
const HOSTEL_COORDS = {
	lat: 28.749883,
	lng: 77.117486,
};

const MAX_DISTANCE_KM = 1;

const toRadians = (value) => (value * Math.PI) / 180;

const haversineDistanceKm = (lat1, lng1, lat2, lng2) => {
	const earthRadiusKm = 6371;
	const dLat = toRadians(lat2 - lat1);
	const dLng = toRadians(lng2 - lng1);

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return earthRadiusKm * c;
};

const formatDate = (date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

const markAttendance = async (req, res) => {
	try {
		const userId = req.user?.userId || req.user?.id;
		if (!userId) {
			return res.status(401).json({ message: 'Unauthorized: user not found in request' });
		}

		const { lat, lng } = req.body || {};
		if (lat === undefined || lng === undefined) {
			return res.status(400).json({ message: 'Location is required (lat and lng)' });
		}

		const numericLat = Number(lat);
		const numericLng = Number(lng);
		if (Number.isNaN(numericLat) || Number.isNaN(numericLng)) {
			return res.status(400).json({ message: 'Invalid location coordinates' });
		}

		const distanceKm = haversineDistanceKm(numericLat, numericLng, HOSTEL_COORDS.lat, HOSTEL_COORDS.lng);
		if (distanceKm > MAX_DISTANCE_KM) {
			return res.status(403).json({
				message: 'You are outside the allowed hostel radius',
				distanceKm,
			});
		}

		const today = formatDate(new Date());

		const existing = await Attendance.findOne({ student: userId, date: today });
		if (existing) {
			return res.status(409).json({ message: 'Attendance already marked for today' });
		}

		const attendance = await Attendance.create({
			student: userId,
			date: today,
			status: 'present',
			location: { lat: numericLat, lng: numericLng },
		});

		return res.status(201).json({
			message: 'Attendance marked successfully',
			attendance,
		});
	} catch (error) {
		if (error?.code === 11000) {
			return res.status(409).json({ message: 'Attendance already marked for today' });
		}
		return res.status(500).json({ message: 'Failed to mark attendance', error: error.message });
	}
};

const getMonthlyAttendance = async (req, res) => {
	try {
		const userId = req.user?.userId || req.user?.id;
		if (!userId) {
			return res.status(401).json({ message: 'Unauthorized: user not found in request' });
		}

		const month = Number(req.query.month);
		const year = Number(req.query.year);

		if (!Number.isInteger(month) || month < 1 || month > 12 || !Number.isInteger(year) || year < 1970) {
			return res.status(400).json({ message: 'Invalid month/year query parameters' });
		}

		const firstDay = new Date(year, month - 1, 1);
		const lastDay = new Date(year, month, 0);
		const startDate = formatDate(firstDay);
		const endDate = formatDate(lastDay);

		const records = await Attendance.find({
			student: userId,
			date: { $gte: startDate, $lte: endDate },
		})
			.select('date status -_id')
			.lean();

		const byDate = new Map(records.map((record) => [record.date, record.status]));

		const daysInMonth = lastDay.getDate();
		const attendance = [];

		for (let day = 1; day <= daysInMonth; day += 1) {
			const date = formatDate(new Date(year, month - 1, day));
			attendance.push({
				date,
				status: byDate.get(date) || 'absent',
			});
		}

		return res.status(200).json({ attendance });
	} catch (error) {
		return res.status(500).json({ message: 'Failed to fetch monthly attendance', error: error.message });
	}
};

export { getMonthlyAttendance, markAttendance };
