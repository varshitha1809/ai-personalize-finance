import { useEffect, useState } from "react";
import { TrendingUp, AlertTriangle, CheckCircle, DollarSign } from "lucide-react";

const API = "http://127.0.0.1:8000";

export function ForecastingPage() {
  const [forecast, setForecast] = useState<any>(null);
  const [insights, setInsights] = useState<string[]>([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      const [fRes, iRes] = await Promise.all([
        fetch(`${API}/forecast?user_id=${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${API}/ai-insights?user_id=${userId}`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const fData = await fRes.json();
      const iData = await iRes.json();
      setForecast(fData);
      setInsights(iData.insights ?? []);
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Financial Forecasting</h1>
        <p className="text-slate-600 dark:text-slate-400">AI-powered predictions for your financial future</p>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Predicted</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Next Month Spending</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">
            ₹{forecast?.prediction?.toLocaleString() ?? "—"}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Based on your average × 1.08</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-lg bg-orange-500/20 border border-orange-500/30">
              <span className="text-xs font-medium text-orange-600 dark:text-orange-400">Watch</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Spending Trend</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">+8%</p>
          <p className="text-sm text-orange-500 mt-2">Projected increase</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Model</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Forecast Model</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">Avg+8%</p>
          <p className="text-sm text-indigo-500 mt-2">Simple trend model</p>
        </div>
      </div>

      {/* AI Insights */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">AI Insights</h3>
            <div className="space-y-3">
              {insights.length === 0 ? (
                <p className="text-slate-500">No insights yet. Add some expenses first.</p>
              ) : (
                insights.map((insight, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10">
                    <p className="text-sm text-slate-900 dark:text-white">{insight}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scenarios */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Scenario Simulation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: "Conservative Spending", desc: "Reduce monthly expenses by 15%", color: "emerald" },
            { name: "Increase Savings Rate", desc: "Save 35% of income instead of 20%", color: "indigo" },
            { name: "Side Income", desc: "Add ₹15,000/month freelance income", color: "purple" },
          ].map((s, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{s.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
