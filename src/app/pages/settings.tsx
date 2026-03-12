import { User, Bell, Lock, Palette, Database, CreditCard, Shield, LogOut } from "lucide-react";
import { useTheme } from "../components/theme-provider";

export function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <User className="h-5 w-5 text-indigo-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Profile Settings</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-2xl">
              JD
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-900 dark:text-white mb-1">John Doe</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">john.doe@example.com</p>
            </div>
            <button className="px-4 py-2 rounded-lg bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/30 transition-all">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <Palette className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Appearance</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white mb-1">Theme</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Choose your preferred color scheme</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTheme("light")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  theme === "light"
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                }`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  theme === "dark"
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                }`}
              >
                Dark
              </button>
              <button
                onClick={() => setTheme("system")}
                className={`px-4 py-2 rounded-lg transition-all ${
                  theme === "system"
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                }`}
              >
                System
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="h-5 w-5 text-emerald-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <p className="font-medium text-slate-900 dark:text-white mb-1">Bill Reminders</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Get notified before bills are due</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <p className="font-medium text-slate-900 dark:text-white mb-1">AI Insights</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Receive AI-powered financial insights</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div>
              <p className="font-medium text-slate-900 dark:text-white mb-1">Budget Alerts</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Alerts when approaching budget limits</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-slate-300 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <Lock className="h-5 w-5 text-orange-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Security</h3>
        </div>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <span className="text-slate-900 dark:text-white">Change Password</span>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-slate-600 dark:text-slate-400" />
              <span className="text-slate-900 dark:text-white">Two-Factor Authentication</span>
            </div>
            <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Enabled</span>
            </div>
          </button>
        </div>
      </div>

      {/* Connected Accounts */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <CreditCard className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Connected Accounts</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-slate-900 dark:text-white">HDFC Bank</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">••••1234</p>
              </div>
            </div>
            <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Connected</span>
            </div>
          </div>
          <button className="w-full p-4 rounded-xl border-2 border-dashed border-white/20 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-indigo-500/50 hover:text-indigo-500 transition-all">
            + Add Bank Account
          </button>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3 mb-6">
          <Database className="h-5 w-5 text-cyan-500" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Data & Privacy</h3>
        </div>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all">
            <span className="text-slate-900 dark:text-white">Download Your Data</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-all">
            <span className="text-slate-900 dark:text-white">Privacy Policy</span>
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 transition-all">
            <span className="text-red-600 dark:text-red-400">Delete Account</span>
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <button className="w-full flex items-center justify-center gap-3 p-4 rounded-xl bg-slate-900 dark:bg-white/10 text-white hover:bg-slate-800 dark:hover:bg-white/20 transition-all">
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
