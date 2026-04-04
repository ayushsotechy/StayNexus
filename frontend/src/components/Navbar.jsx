import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
	const navigate = useNavigate();
	const [token, setToken] = useState(localStorage.getItem('token') || '');

	useEffect(() => {
		const syncToken = () => setToken(localStorage.getItem('token') || '');
		window.addEventListener('auth-changed', syncToken);
		window.addEventListener('storage', syncToken);
		return () => {
			window.removeEventListener('auth-changed', syncToken);
			window.removeEventListener('storage', syncToken);
		};
	}, []);

	const userName = useMemo(() => {
		if (!token) return null;
		try {
			const decoded = JSON.parse(atob(token.split('.')[1] || ''));
			if (!decoded || (decoded.exp && decoded.exp * 1000 <= Date.now())) return null;
			return decoded.name || decoded.email || 'Resident';
		} catch {
			return null;
		}
	}, [token]);

	const hasToken = Boolean(userName);

	const handleLogout = () => {
		localStorage.removeItem('token');
		try {
			window.dispatchEvent(new Event('auth-changed'));
		} catch {
			// no-op
		}
		navigate('/');
	};

	return (
		<header className="sticky top-0 z-20 backdrop-blur-md border-b border-white/10 bg-[#09100d]/70">
			<div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
				<Link to="/" className="text-xl font-black tracking-wide text-[#f6f4ef]">
					StayNexus
				</Link>

				<div className="flex items-center gap-2">
					<Link
						to="/reports"
						className="px-3 py-1.5 rounded-lg border border-white/25 text-sm text-[#f6f4ef] hover:bg-white/10 transition-colors"
					>
						Reports
					</Link>
					<Link
						to="/hostelcart"
						className="px-3 py-1.5 rounded-lg border border-white/25 text-sm text-[#f6f4ef] hover:bg-white/10 transition-colors"
					>
						HostelCart
					</Link>
					{!hasToken ? (
						<>
							<Link to="/login" className="px-3 py-1.5 rounded-lg border border-white/25 text-sm text-[#f6f4ef] hover:bg-white/10 transition-colors">
								Login
							</Link>
							<Link to="/signup" className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-[#e8b15a] text-[#152018] hover:bg-[#f2c374] transition-colors">
								Signup
							</Link>
						</>
					) : (
						<>
							<Link
								to="/profile"
								className="px-3 py-1.5 rounded-lg border border-white/25 text-sm text-[#f6f4ef] hover:bg-white/10 transition-colors"
							>
								Profile
							</Link>
							<button
								type="button"
								onClick={handleLogout}
								className="px-3 py-1.5 rounded-lg border border-white/25 text-sm text-[#f6f4ef] hover:bg-white/10 transition-colors"
							>
								Logout
							</button>
							<span className="hidden sm:flex ml-3 items-center px-3 py-1.5 rounded-lg border border-[#e8b15a]/35 bg-[#e8b15a]/10 text-sm font-semibold text-[#f6f4ef] max-w-[160px] truncate">
								{userName}
							</span>
						</>
					)}
				</div>
			</div>
		</header>
	);
}

export default Navbar;
