import { Download, TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const monthlyData = [
  { month: "Jan", income: 85000, expenses: 55000, savings: 30000 },
  { month: "Feb", income: 85000, expenses: 58000, savings: 27000 },
  { month: "Mar", income: 85000, expenses: 62000, savings: 23000 },
  { month: "Apr", income: 85000, expenses: 61000, savings: 24000 },
  { month: "May", income: 85000, expenses: 55000, savings: 30000 },
  { month: "Jun", income: 85000, expenses: 67000, savings: 18000 },
];

const categoryComparison = [
  { category: "Food", lastMonth: 18000, thisMonth: 22000 },
  { category: "Transport", lastMonth: 7200, thisMonth: 7800 },
  { category: "Shopping", lastMonth: 12000, thisMonth: 16200 },
  { category: "Bills", lastMonth: 11500, thisMonth: 11500 },
  { category: "Entertainment", lastMonth: 6800, thisMonth: 4800 },
];

export function ReportsPage() {
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

      {/* Period Selector */}
      <div className="flex items-center gap-3">
        <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
          Last 6 Months
        </button>
        <button className="px-4 py-2 rounded-lg bg-white/60 dark:bg-white/5 text-slate-900 dark:text-white border border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all">
          This Year
        </button>
        <button className="px-4 py-2 rounded-lg bg-white/60 dark:bg-white/5 text-slate-900 dark:text-white border border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all">
          Custom Range
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-5 w-5 text-indigo-500" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Income</p>
          </div>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">₹5,10,000</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Last 6 months</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="h-5 w-5 text-red-500" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Expenses</p>
          </div>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">₹3,58,000</p>
          <p className="text-xs text-red-600 dark:text-red-400 mt-1">Last 6 months</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-emerald-500" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Total Savings</p>
          </div>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">₹1,52,000</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Last 6 months</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            <p className="text-sm text-slate-600 dark:text-slate-400">Avg. Monthly</p>
          </div>
          <p className="text-2xl font-semibold text-slate-900 dark:text-white">₹59,667</p>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Expenses</p>
        </div>
      </div>

      {/* Income vs Expenses */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Income vs Expenses</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis dataKey="month" stroke="#94a3b8" />
            <YAxis stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(30, 30, 46, 0.9)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Bar dataKey="income" fill="#10B981" name="Income" />
            <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            <Bar dataKey="savings" fill="#6366F1" name="Savings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Comparison */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Month-over-Month Comparison</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryComparison} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
            <XAxis type="number" stroke="#94a3b8" />
            <YAxis dataKey="category" type="category" stroke="#94a3b8" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(30, 30, 46, 0.9)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend />
            <Bar dataKey="lastMonth" fill="#94a3b8" name="Last Month" />
            <Bar dataKey="thisMonth" fill="#6366F1" name="This Month" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 backdrop-blur-xl">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Positive Trends</h4>
          <ul className="space-y-2 text-sm text-slate-900 dark:text-white">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">✓</span>
              <span>Savings increased by 23% compared to last quarter</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">✓</span>
              <span>Entertainment expenses reduced by 29%</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500">✓</span>
              <span>Consistent income maintained across all months</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 backdrop-blur-xl">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-3">Areas to Improve</h4>
          <ul className="space-y-2 text-sm text-slate-900 dark:text-white">
            <li className="flex items-start gap-2">
              <span className="text-orange-500">⚠</span>
              <span>Food expenses increased by 22% this month</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">⚠</span>
              <span>Shopping expenses up by 35% compared to average</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500">⚠</span>
              <span>Savings rate dropped to 21% in June</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
