import { Outlet, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Receipt, 
  Bot, 
  TrendingUp, 
  PiggyBank,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Settings,
  Sparkles,
  Moon,
  Sun
} from "lucide-react";
import { useTheme } from "../theme-provider";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/app" },
  { icon: Receipt, label: "Expenses", path: "/app/expenses" },
  { icon: Bot, label: "AI Assistant", path: "/app/ai-assistant" },
  { icon: TrendingUp, label: "Forecasting", path: "/app/forecasting" },
  { icon: PiggyBank, label: "Budget Planner", path: "/app/budget-planner" },
  { icon: Users, label: "Group Expenses", path: "/app/group-expenses" },
  { icon: FileText, label: "Receipts", path: "/app/receipts" },
  { icon: Calendar, label: "Calendar", path: "/app/calendar" },
  { icon: BarChart3, label: "Reports", path: "/app/reports" },
  { icon: Settings, label: "Settings", path: "/app/settings" },
];

export function MainLayout() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch("http://127.0.0.1:8000/user/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => { if (d?.name) setUser(d); })
      .catch(() => {});
  }, []);
  
  const isActive = (path: string) => {
    if (path === "/app") {
      return location.pathname === "/app";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-slate-950 dark:via-indigo-950/30 dark:to-purple-950/20">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-white/20 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl">
        <div className="flex h-full flex-col px-3 py-4">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-2 px-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F46E5] to-[#A855F7]">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-slate-900 dark:text-white">FinanceAI</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Intelligence Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all ${
                    active
                      ? "bg-gradient-to-r from-[#4F46E5] to-[#A855F7] text-white shadow-lg shadow-indigo-500/50"
                      : "text-slate-700 hover:bg-white/60 dark:text-slate-300 dark:hover:bg-white/5"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="mt-auto border-t border-white/20 dark:border-white/10 pt-4">
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm">
                  {user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "?"}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{user?.name ?? "..."}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Premium</p>
                </div>
              </div>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-lg p-2 hover:bg-white/60 dark:hover:bg-white/5"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-slate-400" />
                ) : (
                  <Moon className="h-4 w-4 text-slate-600" />
                )}
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top AI Assistant Bar */}
        <header className="sticky top-0 z-30 border-b border-white/20 dark:border-white/10 bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#06FFA5] to-[#10B981] animate-pulse flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">AI Assistant Active</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Monitoring your finances in real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Financial Health: Excellent</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
