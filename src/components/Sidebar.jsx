import { BarChart3, Users, DollarSign, FolderGit2 } from "lucide-react";

export default function Sidebar({ menuItems, sidebarOpen, setSidebarOpen, onNavigate }) {
  const iconMap = {
    Users: Users,
    DollarSign: DollarSign,
    FolderGit2: FolderGit2,
  };

  return (
    <>
      {/* Overlay Mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-72 flex flex-col
          bg-white dark:bg-slate-900
          border-r border-gray-200 dark:border-slate-800
          shadow-2xl lg:shadow-none
          transition-transform duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <BarChart3 size={24} className="text-white" />
              <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse-custom" />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Clever Connection
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">Painel CRM v2.0</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.link);
                  if (window.innerWidth < 1024) setSidebarOpen(false);
                }}
                disabled={item.link === '#'}
                className={`
                  group w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300 relative overflow-hidden
                  text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800
                  ${item.link === '#' ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'}
                `}
              >
                <Icon size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-medium relative z-10">{item.name}</span>
                {item.link !== '#' && (
                  <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-800 border border-gray-200 dark:border-slate-700">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center font-medium">
              © 2025 Clever Connection
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-1">
              Sistema CRM Integrado
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}