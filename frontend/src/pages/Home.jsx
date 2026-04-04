import { Link } from 'react-router-dom';

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

  return (
    <div className="min-h-screen text-[#f6f4ef] bg-[radial-gradient(circle_at_15%_20%,#24403a_0%,#0f1d1a_35%,#0a1210_100%)]">
      <header className="sticky top-0 z-20 backdrop-blur-md border-b border-white/10 bg-[#09100d]/70">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-black tracking-wide">StayNexus</div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-[#c8d2cb]">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#flow" className="hover:text-white transition-colors">How It Works</a>
            <a href="#stats" className="hover:text-white transition-colors">Proof</a>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
        <section className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="inline-block px-3 py-1 rounded-full text-xs tracking-wide bg-[#e8b15a]/20 text-[#ffd89b] border border-[#e8b15a]/35 mb-5">
              All-in-One Hostel Solution
            </p>
            <h1 className="text-4xl sm:text-6xl font-black leading-tight">
              Move In Faster.
              <br />
              Live Better With StayNexus.
            </h1>
            <p className="mt-5 text-[#c8d2cb] text-base sm:text-lg max-w-xl">
              StayNexus combines discovery, booking, marketplace, and support into one student-first hostel platform.
              No scattered groups, no missing info, no booking chaos.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {greeting ? (
                <div className="px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-sm sm:text-base">
                  Welcome back, {greeting}
                </div>
              ) : (
                <>
                  <Link to="/signup" className="px-5 py-3 rounded-xl font-semibold bg-[#e8b15a] text-[#152018] hover:bg-[#f2c374] transition-colors">
                    Start Your Stay
                  </Link>
                  <Link to="/login" className="px-5 py-3 rounded-xl font-semibold border border-white/30 hover:bg-white/10 transition-colors">
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-[#111d19]/80 p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
            <p className="text-sm text-[#9fb0a6]">Today on StayNexus</p>
            <div className="mt-4 space-y-4">
              <div className="rounded-xl bg-[#1a2a25] p-4 border border-white/10">
                <p className="text-xs text-[#9fb0a6]">Recommended For You</p>
                <p className="mt-1 font-semibold">NDPG - Block B, Room 214</p>
                <p className="text-sm text-[#c8d2cb]">Double sharing, attached washroom, 2 slots left</p>
              </div>
              <div className="rounded-xl bg-[#1a2a25] p-4 border border-white/10">
                <p className="text-xs text-[#9fb0a6]">HostelCart</p>
                <p className="mt-1 font-semibold">Study Table listed in VMH</p>
                <p className="text-sm text-[#c8d2cb]">Pickup available tonight, verified seller</p>
              </div>
              <div className="rounded-xl bg-[#1a2a25] p-4 border border-white/10">
                <p className="text-xs text-[#9fb0a6]">Issue Tracker</p>
                <p className="mt-1 font-semibold">Mess card request approved</p>
                <p className="text-sm text-[#c8d2cb]">Raised 2h ago, now ready for collection</p>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature) => (
            <article key={feature.title} className="rounded-2xl border border-white/10 bg-[#111d19]/75 p-5 hover:bg-[#14231e] transition-colors">
              <h3 className="font-bold text-lg">{feature.title}</h3>
              <p className="mt-2 text-sm text-[#b9c5be]">{feature.desc}</p>
            </article>
          ))}
        </section>

        <section id="flow" className="mt-16 rounded-2xl border border-white/10 bg-[#0f1916] p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-black">One Flow, Zero Friction</h2>
          <div className="mt-5 grid sm:grid-cols-3 gap-4 text-sm">
            <div className="rounded-xl bg-[#182723] p-4 border border-white/10">
              <p className="text-[#e8b15a] font-semibold">Step 1</p>
              <p className="mt-1">Set your hostel, budget, and preferences.</p>
            </div>
            <div className="rounded-xl bg-[#182723] p-4 border border-white/10">
              <p className="text-[#e8b15a] font-semibold">Step 2</p>
              <p className="mt-1">Get best-fit listings and roommate suggestions.</p>
            </div>
            <div className="rounded-xl bg-[#182723] p-4 border border-white/10">
              <p className="text-[#e8b15a] font-semibold">Step 3</p>
              <p className="mt-1">Book, buy essentials, and track hostel requests.</p>
            </div>
          </div>
        </section>

        <section id="stats" className="mt-16 grid sm:grid-cols-3 gap-4">
          {quickStats.map((s) => (
            <div key={s.label} className="rounded-2xl border border-white/10 bg-[#111d19]/75 p-6 text-center">
              <p className="text-4xl font-black text-[#e8b15a]">{s.value}</p>
              <p className="mt-2 text-[#b9c5be]">{s.label}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="border-t border-white/10 py-6 text-center text-sm text-[#9fb0a6]">
        © {new Date().getFullYear()} StayNexus. Hostel life, organized.
      </footer>
    </div>
  );
};

export default Home;
