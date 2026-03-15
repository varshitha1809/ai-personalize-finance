import { useEffect, useState } from "react";
import { Download, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const API = "http://127.0.0.1:8000";

export function ReportsPage() {
  const [summary, setSummary] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API}/reports?user_id=${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSummary(data);

      // Build chart data from categories
      if (data.categories) {
        const chart = Object.entries(data.categories).map(([cat, amount]) => ({
          category: cat,
          amount,
        }));
        setChartData(chart);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Financial Reports</h1>
          <p className="text-slate-600 dark:text-slate-400">Comprehensive analysis of your financial data</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all">
          <Download className="h-5 w-5" />
          Export Report
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Expenses</p>
          </div>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">
            ₹{summary?.total_spending?.toLocaleString() ?? 0}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Transactions</p>
          </div>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">
            {summary?.transactions ?? 0}
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-indigo-500" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Per Transaction</p>
          </div>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">
            ₹{summary?.transactions ? Math.round(summary.total_spending / summary.transactions).toLocaleString() : 0}
          </p>
        </div>
      </div>

      {/* Category Breakdown Chart */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Spending by Category</h3>
        {chartData.length === 0 ? (
          <p className="text-center text-slate-500 py-8">No data yet. Add some expenses first.</p>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
              <XAxis dataKey="category" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(30, 30, 46, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Bar dataKey="amount" fill="#6366F1" name="Amount (₹)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Category List */}
      {chartData.length > 0 && (
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {chartData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                <span className="text-slate-900 dark:text-white">{item.category}</span>
                <span className="font-semibold text-red-500">₹{(item.amount as number).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
