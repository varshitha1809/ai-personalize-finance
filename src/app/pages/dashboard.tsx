import { TrendingUp, TrendingDown, Wallet, PiggyBank, AlertCircle, Activity, Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const spendingData = [
  { month: "Jan", spending: 45000, savings: 15000 },
  { month: "Feb", spending: 52000, savings: 12000 },
  { month: "Mar", spending: 48000, savings: 18000 },
  { month: "Apr", spending: 61000, savings: 10000 },
  { month: "May", spending: 55000, savings: 14000 },
  { month: "Jun", spending: 67000, savings: 8000 },
];

const categoryData = [
  { name: "Food & Dining", value: 25000, color: "#4F46E5" },
  { name: "Transportation", value: 12000, color: "#10B981" },
  { name: "Shopping", value: 18000, color: "#A855F7" },
  { name: "Bills & Utilities", value: 15000, color: "#F59E0B" },
  { name: "Entertainment", value: 8000, color: "#EC4899" },
];

const forecastData = [
  { month: "Jul", predicted: 58000, actual: 55000 },
  { month: "Aug", predicted: 62000, actual: 59000 },
  { month: "Sep", predicted: 65000, actual: 61000 },
  { month: "Oct", predicted: 68000 },
  { month: "Nov", predicted: 70000 },
  { month: "Dec", predicted: 72000 },
];

const aiInsights = [
  {
    text: "Your spending on food increased 18% this month.",
    type: "warning",
    impact: "₹3,200 extra spent"
  },
  {
    text: "Based on current trends you will save ₹2.4 lakh in 2 years.",
    type: "success",
    impact: "On track"
  },
  {
    text: "Recommendation: Reduce dining expenses by 15% to save ₹32,000 annually.",
    type: "info",
    impact: "Potential savings"
  }
];

const upcomingBills = [
  { name: "Electricity Bill", amount: 2500, date: "Mar 20", status: "pending" },
  { name: "Netflix Subscription", amount: 649, date: "Mar 22", status: "pending" },
  { name: "Internet Bill", amount: 999, date: "Mar 25", status: "pending" },
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Financial Dashboard</h1>
        <p className="text-slate-600 dark:text-slate-400">Your complete financial overview at a glance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm">
              <ArrowUpRight className="h-4 w-4" />
              12%
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total Balance</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹4,85,230</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <span className="flex items-center gap-1 text-red-600 dark:text-red-400 text-sm">
              <ArrowDownRight className="h-4 w-4" />
              8%
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Monthly Spending</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹67,420</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <PiggyBank className="h-6 w-6 text-white" />
            </div>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-sm">
              <ArrowUpRight className="h-4 w-4" />
              24%
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Savings Progress</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹1,24,800</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
            <div className="px-2 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Excellent</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Financial Health</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">8.7/10</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Trend */}
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Spending & Savings Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendingData}>
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
              <Line type="monotone" dataKey="spending" stroke="#EF4444" strokeWidth={3} />
              <Line type="monotone" dataKey="savings" stroke="#10B981" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Spending by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(30, 30, 46, 0.9)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights & Forecast */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Insights */}
        <div className="lg:col-span-1 p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 dark:border-indigo-500/20 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">AI Insights</h3>
          </div>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-xl border ${
                  insight.type === "warning" 
                    ? "bg-orange-500/10 border-orange-500/20" 
                    : insight.type === "success"
                    ? "bg-emerald-500/10 border-emerald-500/20"
                    : "bg-blue-500/10 border-blue-500/20"
                }`}
              >
                <p className="text-sm text-slate-900 dark:text-white mb-2">{insight.text}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{insight.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Forecast Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">AI Balance Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A855F7" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#A855F7" stopOpacity={0}/>
                </linearGradient>
              </defs>
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
              <Area type="monotone" dataKey="actual" stroke="#10B981" fill="#10B981" fillOpacity={0.2} strokeWidth={2} />
              <Area type="monotone" dataKey="predicted" stroke="#A855F7" fill="url(#colorPredicted)" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming Bills */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Upcoming Bills</h3>
        <div className="space-y-3">
          {upcomingBills.map((bill, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 dark:bg-white/5 border border-slate-200/50 dark:border-white/10">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{bill.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Due: {bill.date}, 2026</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-slate-900 dark:text-white">₹{bill.amount.toLocaleString()}</p>
                <div className="px-2 py-1 rounded bg-orange-500/20 border border-orange-500/30">
                  <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Pending</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
