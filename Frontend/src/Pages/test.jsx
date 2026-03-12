import { useState } from "react";

const stats = [
  { label: "Total SOPs", value: 24, icon: "📄" },
  { label: "Draft SOPs", value: 7, icon: "✏️" },
  { label: "Published SOPs", value: 17, icon: "✅" },
];

const Dashboard = () => {
  const [userName] = useState("John Doe");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Decorative blobs */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-10 border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight">SOP Manager</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-slate-400">
              Welcome, <span className="text-amber-400 font-medium">{userName}</span>
            </span>
            <button className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 hover:shadow-amber-500/30 active:scale-[0.97] transition-all duration-300">
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-slate-400 mt-1 text-sm">Manage your Standard Operating Procedures</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl shadow-black/20 hover:scale-[1.03] hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{stat.icon}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Overview</span>
              </div>
              <p className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-sm text-slate-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Action Section */}
        <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl shadow-black/20">
          <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
          <p className="text-sm text-slate-400 mb-6">Create new procedures or browse existing ones.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 font-semibold rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/20 hover:from-amber-400 hover:to-orange-400 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              + Create SOP
            </button>
            <button className="px-6 py-3 font-semibold rounded-xl bg-slate-900/50 border border-slate-600/50 text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              View All SOPs
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
