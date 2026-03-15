import { useState, useEffect } from "react";
import { Plus, Search, Filter, Download, Brain, Sparkles, Trash2 } from "lucide-react";

const categories = [
  { name: "All", color: "bg-slate-500" },
  { name: "Food", color: "bg-indigo-500" },
  { name: "Transportation", color: "bg-emerald-500" },
  { name: "Shopping", color: "bg-purple-500" },
  { name: "Bills", color: "bg-orange-500" },
  { name: "Entertainment", color: "bg-pink-500" },
];

const API = "http://127.0.0.1:8000";

export function ExpensesPage() {
  const [expenses, setExpenses] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [form, setForm] = useState({ title: "", category: "Food", amount: "" });

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  const fetchExpenses = async () => {
    const res = await fetch(`${API}/expenses?user_id=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setExpenses(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchExpenses(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API}/expenses?user_id=${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...form, amount: parseFloat(form.amount) }),
    });
    setForm({ title: "", category: "Food", amount: "" });
    setShowAddModal(false);
    fetchExpenses();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API}/expenses/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchExpenses();
  };

  const filtered = expenses.filter((t) => {
    const matchCat = selectedCategory === "All" || t.category === selectedCategory;
    const matchSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Expense Tracker</h1>
          <p className="text-slate-600 dark:text-slate-400">Track and manage all your transactions</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
        >
          <Plus className="h-5 w-5" />
          Add Expense
        </button>
      </div>

      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-slate-900 dark:text-white">AI Smart Categorization Active</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Automatically categorizing your transactions</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white">
          <Filter className="h-5 w-5" /> Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white">
          <Download className="h-5 w-5" /> Export
        </button>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === cat.name
                ? `${cat.color} text-white shadow-lg`
                : "bg-white/60 dark:bg-white/5 text-slate-700 dark:text-slate-300"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20 dark:border-white/10">
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">Title</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">Category</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">Amount</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">No expenses found. Add one!</td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className="border-b border-white/10 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{t.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      {t.title}
                      <div className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-indigo-400" />
                        <span className="text-xs text-indigo-400">AI</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{t.category}</td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-red-500">
                      -₹{t.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => handleDelete(t.id)} className="p-2 rounded-lg hover:bg-red-500/20 transition-colors">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-slate-900 border border-white/20">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Add Expense</h2>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. Starbucks"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {categories.filter(c => c.name !== "All").map(c => (
                    <option key={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g. 450"
                />
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
