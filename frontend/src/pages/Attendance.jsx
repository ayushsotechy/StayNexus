import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getMonthlyAttendance, markAttendance } from '../api/attendance';

function AttendancePage() {
	const [loading, setLoading] = useState(false);
	const [attendance, setAttendance] = useState([]);
	const [month, setMonth] = useState(new Date().getMonth() + 1);
	const [year, setYear] = useState(new Date().getFullYear());

	const fetchAttendance = async () => {
		try {
			const data = await getMonthlyAttendance(month, year);
			setAttendance(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchAttendance();
	}, [month, year]);

	const handleMarkAttendance = () => {
		if (!navigator.geolocation) {
			alert('Geolocation not supported');
			return;
		}

		setLoading(true);

		navigator.geolocation.getCurrentPosition(
			async (pos) => {
				try {
					const { latitude, longitude } = pos.coords;

					await markAttendance(latitude, longitude);

					alert('Attendance marked');
					fetchAttendance();
				} catch (err) {
					alert(err?.response?.data?.message || err?.response?.data?.msg || 'Failed');
				} finally {
					setLoading(false);
				}
			},
			() => {
				alert('Location permission denied');
				setLoading(false);
			}
		);
	};

	const daysInMonth = new Date(year, month, 0).getDate();

	const getStatus = (date) => {
		const found = attendance.find((d) => d.date === date);
		return found ? found.status : 'absent';
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<Navbar />

			<div className="p-6">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-2xl font-bold">Attendance</h1>

					<button
						onClick={handleMarkAttendance}
						disabled={loading}
						className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded font-semibold"
					>
						{loading ? 'Marking...' : 'Mark Attendance'}
					</button>
				</div>

				<div className="flex gap-4 mb-6">
					<input
						type="number"
						value={month}
						onChange={(e) => setMonth(Number(e.target.value))}
						className="bg-gray-800 p-2 rounded"
						min="1"
						max="12"
					/>
					<input
						type="number"
						value={year}
						onChange={(e) => setYear(Number(e.target.value))}
						className="bg-gray-800 p-2 rounded"
					/>
				</div>

				<div className="grid grid-cols-7 gap-2">
					{[...Array(daysInMonth)].map((_, i) => {
						const day = i + 1;
						const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

						const status = getStatus(date);

						let bg = 'bg-gray-700';
						if (status === 'present') bg = 'bg-green-500';
						if (status === 'leave') bg = 'bg-yellow-500';
						if (status === 'absent') bg = 'bg-red-500';

						return (
							<div key={day} className={`${bg} p-4 rounded text-center font-bold`}>
								{day}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default AttendancePage;
