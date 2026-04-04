import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
	const navigate = useNavigate();
	const hasToken = Boolean(localStorage.getItem('token'));

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
						<button
							type="button"
							onClick={handleLogout}
							className="px-3 py-1.5 rounded-lg border border-white/25 text-sm text-[#f6f4ef] hover:bg-white/10 transition-colors"
						>
							Logout
						</button>
					)}
				</div>
			</div>
		</header>
	);
}

export default Navbar;
