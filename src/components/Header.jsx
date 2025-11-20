import { Menu, X, Activity } from "lucide-react";

export default function Header({ sidebarOpen, setSidebarOpen }) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 shadow-sm">
      <div className="px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300"
        >
          {sidebarOpen ? (
            <X size={20} className="text-gray-700 dark:text-gray-300" />
          ) : (
            <Menu size={20} className="text-gray-700 dark:text-gray-300" />
          )}
        </button>

        <div className="flex-1 lg:ml-0 ml-4">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Painel de Sistemas CRM
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
            Acesso rápido aos seus CRMs
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
          <Activity size={14} className="text-green-600 dark:text-green-400 animate-pulse-custom" />
          <span className="text-xs font-semibold text-green-700 dark:text-green-400">Online</span>
        </div>
      </div>
    </header>
  );
}