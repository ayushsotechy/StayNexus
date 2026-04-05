import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const features = [
  {
    title: 'Verified Hostel Listings',
    desc: 'Compare photos, pricing, occupancy, and amenities in one clean dashboard.',
  },
  {
    title: 'Roommate + Room Match',
    desc: 'Match by budget, lifestyle, and block preference before you finalize.',
  },
  {
    title: 'HostelCart Marketplace',
    desc: 'Buy and sell essentials with students in nearby hostels safely.',
  },
  {
    title: 'Issue + Service Tracker',
    desc: 'Raise complaints, follow status, and get updates without chasing admins.',
  },
];

const quickStats = [
  { value: '320+', label: 'Verified Listings' },
  { value: '2.1K', label: 'Students Active' },
  { value: '9 min', label: 'Avg. Match Time' },
];

const Home = () => {
  const token = localStorage.getItem('token') || '';
  let greeting = null;

  try {
    const decoded = JSON.parse(atob(token.split('.')[1] || ''));
    if (decoded && decoded.exp * 1000 > Date.now()) {
      greeting = decoded.name || decoded.email || 'Resident';
    }
  } catch {
    greeting = null;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    try {
      window.dispatchEvent(new Event('auth-changed'));
    } catch {
      // no-op
    }
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen text-[#e6edf3] bg-[radial-gradient(circle_at_15%_20%,#1e3a8a_0%,#020617_45%,#000000_100%)]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-block px-3 py-1 rounded-full text-xs tracking-wide bg-[#1e3a8a]/20 text-[#93c5fd] border border-[#1e3a8a]/40 mb-5">
              All-in-One Hostel Solution
            </p>
            <h1 className="text-4xl sm:text-6xl font-black leading-tight">
              Move In Faster.
              <br />
              Live Better With <span className="text-[#60a5fa] drop-shadow-[0_0_6px_rgba(96,165,250,0.4)]">StayNexus</span>
            </h1>
            <p className="mt-5 text-[#c8d2cb] text-base sm:text-lg max-w-xl">
              StayNexus combines discovery, booking, marketplace, and support into one student-first hostel platform.
              No scattered groups, no missing info, no booking chaos.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {greeting ? (
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="px-5 py-3 rounded-xl bg-white/10 border border-gray-500/40 backdrop-blur text-sm sm:text-base">
                    Welcome back, {greeting}
                  </div>
                  <Link to="/profile" className="px-5 py-3 rounded-xl font-semibold border border-gray-500/40 hover:bg-gray-800/40 backdrop-blur transition-colors">
                    Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-5 py-3 rounded-xl font-semibold border border-gray-500/40 hover:bg-gray-800/40 backdrop-blur transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/signup" className="px-5 py-3 rounded-xl font-semibold bg-[#2563eb] text-white hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/30">
                    Start Your Stay
                  </Link>
                  <Link to="/login" className="px-5 py-3 rounded-xl font-semibold border border-gray-500/40 hover:bg-gray-800/40 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-700/40 bg-[#020617]/80 p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl ring-1 ring-white/5">
            <p className="text-sm text-[#60a5fa]">Today on StayNexus</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl bg-[#0f172a] p-4 border border-gray-700/40 hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.25)] transition-all duration-300">
                <p className="text-xs text-[#60a5fa]  ">Recommended For You</p>
                <p className="mt-1 font-semibold">NDPG - Block B, Room 214</p>
                <p className="text-sm text-[#c8d2cb]">Double sharing, attached washroom, 2 slots left</p>
              </div>
              <div className="rounded-xl bg-[#0f172a] p-4 border border-gray-700/40 hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.25)] transition-all duration-300">
                <p className="text-xs text-[#60a5fa]">HostelCart</p>
                <p className="mt-1 font-semibold">Study Table listed in BCH</p>
                <p className="text-sm text-[#c8d2cb]">Pickup available tonight, verified seller</p>
              </div>
              <div className="rounded-xl bg-[#0f172a] p-4 border border-gray-700/40 hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.25)] transition-all duration-300">
                <p className="text-xs text-[#60a5fa]">Issue Tracker</p>
                <p className="mt-1 font-semibold">Mess card request approved</p>
                <p className="text-sm text-[#c8d2cb]">Raised 2h ago, now ready for collection</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-gray-700/40 bg-[#020617]/70 p-5 ring-1 ring-white/5 hover:bg-[#0b1220] hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.25)] transition-all duration-300">
              <h3 className="font-bold text-lg text-gray-100 hover:text-blue-400 transition-colors duration-300">{feature.title}</h3>
              <p className="mt-2 text-sm text-[#b9c5be]">{feature.desc}</p>
            </article>
          ))}
        </section>

        <section id="flow" className="mt-16 rounded-2xl border border-gray-700/40 bg-[#020617] p-6 sm:p-8 ring-1 ring-white/5">
          <h2 className="text-2xl sm:text-3xl font-black">One Flow, <span className="text">Zero Friction</span></h2>
          <div className="mt-5 grid sm:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl bg-[#0f172a] p-4 border border-gray-700/40 ring-1 ring-white/5 hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.25)] transition-all duration-300">
              <p className="text-[#60a5fa] font-semibold">Step 1</p>
              <p className="mt-1">Set your hostel, budget, and preferences.</p>
            </div>
            <div className="rounded-xl bg-[#0f172a] p-4 border border-gray-700/40 ring-1 ring-white/5 hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.25)] transition-all duration-300">
              <p className="text-[#60a5fa] font-semibold">Step 2</p>
              <p className="mt-1">Get best-fit listings and roommate suggestions.</p>
            </div>
            <div className="rounded-xl bg-[#0f172a] p-4 border border-gray-700/40 ring-1 ring-white/5 hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.25)] transition-all duration-300">
              <p className="text-[#60a5fa] font-semibold">Step 3</p>
              <p className="mt-1">Book, buy essentials, and track hostel requests.</p>
            </div>
          </div>
        </section>

        <section id="stats" className="mt-16 grid sm:grid-cols-3 gap-4">
          {quickStats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-gray-700/40 bg-[#020617]/70 p-6 text-center ring-1 ring-white/5 hover:border-blue-500/50 hover:shadow-[0_0_10px_rgba(59,130,246,0.25)] transition-all duration-300">
              <p className="text-4xl font-black text-[#60a5fa]">{s.value}</p>
              <p className="mt-2 text-[#b9c5be]">{s.label}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-gray-700/40 py-6 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} StayNexus. Hostel life, organized.
      </footer>
    </div>
  );
};

export default Home;
