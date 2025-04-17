import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/auth';
import { Brain, LayoutDashboard, MessageSquare, AlertCircle, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const logout = useAuthStore((state) => state.logout);

  const links = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/chat', icon: MessageSquare, label: 'Chat Testing' },
    { to: '/low-confidence', icon: AlertCircle, label: 'Low Confidence' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white h-screen flex flex-col fixed left-0 top-0">
      <div className="p-4 flex items-center gap-2 border-b border-gray-700">
        <Brain className="w-8 h-8" />
        <span className="text-xl font-bold">AI Training Portal</span>
      </div>
      <nav className="flex-1 p-4">
        {links.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-2 p-2 rounded-lg mb-2 ${
              location.pathname === to
                ? 'bg-blue-600'
                : 'hover:bg-gray-800'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <button
        onClick={logout}
        className="p-4 flex items-center gap-2 border-t border-gray-700 hover:bg-gray-800"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export const Layout: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 min-h-screen ml-64">
        <Outlet />
      </main>
    </div>
  );
};