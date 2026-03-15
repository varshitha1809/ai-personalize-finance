import { useEffect, useState } from "react";
import { Sparkles, Plus, Lightbulb } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const API = "http://127.0.0.1:8000";
const COLORS = ["#4F46E5", "#10B981", "#A855F7", "#F59E0B", "#EC4899", "#06B6D4"];

export function BudgetPlannerPage() {
  const [budgets, setBudgets] = useState<any[]>([]);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ category: "", limit: "", month: new Date().toISOString().slice(0, 7) });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  const fetchData = async () => {
    const [bRes, eRes] = await Promise.all([
      fetch(`${API}/budgets`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${API}/expenses?user_id=${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
    ]);
    const bData = await bRes.json();
    const eData = await eRes.json();
    setBudgets(Array.isArray(bData) ? bData : []);
    setExpenses(Array.isArray(eData) ? eData : []);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API}/budgets`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, limit: parseFloat(form.limit) }),
    });
    setForm({ category: "", limit: "", month: new Date().toISOString().slice(0, 7) });
    setShowModal(false);
    fetchData();
  };

  const getSpent = (category: string) =>
    expenses.filter((e) => e.category === category).reduce((sum, e) => sum + e.amount, 0);

  const totalBudget = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => s + getSpent(b.category), 0);

  const pieData = budgets.map((b) => ({ name: b.category, value: b.limit }));

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Budget Planner</h1>
          <p className="text-slate-600 dark:text-slate-400">AI-recommended budget allocation and savings strategies</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg transition-all"
        >
          <Plus className="h-5 w-5" /> Add Budget
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Budget</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹{totalBudget.toLocaleString()}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Spent</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹{totalSpent.toLocaleString()}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Remaining</p>
          <p className={`text-3xl font-semibold ${totalBudget - totalSpent >= 0 ? "text-emerald-500" : "text-red-500"}`}>
            ₹{(totalBudget - totalSpent).toLocaleString()}
          </p>
        </div>
      </div>

      {budgets.length === 0 ? (
        <div className="p-12 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 text-center">
          <p className="text-slate-500">No budgets yet. Click "Add Budget" to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Budget Allocation</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name }) => name}>
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "rgba(30,30,46,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Category Progress</h3>
            <div className="space-y-4">
              {budgets.map((b, i) => {
                const spent = getSpent(b.category);
                const pct = Math.min((spent / b.limit) * 100, 100);
                const over = spent > b.limit;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-slate-900 dark:text-white">{b.category}</span>
                      <span className={`text-sm font-medium ${over ? "text-red-500" : "text-slate-500"}`}>
                        ₹{spent.toLocaleString()} / ₹{b.limit.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${over ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-gradient-to-r from-emerald-500 to-teal-500"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* AI Tips */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">AI Budget Tips</h3>
        </div>
        <div className="space-y-3">
          {[
            { tip: "Reduce dining expenses by 15% to save ₹32,000/year", diff: "Easy" },
            { tip: "Cancel unused subscriptions to save ₹18,000/year", diff: "Easy" },
            { tip: "Use public transport 2 days/week to save ₹24,000/year", diff: "Medium" },
          ].map((r, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 flex items-start gap-3">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-900 dark:text-white">{r.tip}</p>
                <span className="text-xs text-indigo-500 mt-1 inline-block">{r.diff}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Budget Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-slate-900 border border-white/20">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Add Budget</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Food"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Limit (₹)</label>
                <input
                  type="number"
                  value={form.limit}
                  onChange={(e) => setForm({ ...form, limit: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 20000"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Month</label>
                <input
                  type="month"
                  value={form.month}
                  onChange={(e) => setForm({ ...form, month: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white">Add Budget</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
