import { useState } from "react";
import { TrendingUp, AlertTriangle, CheckCircle, DollarSign, Calendar } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const forecastData = [
  { month: "Jan", actual: 485000, predicted: 482000, lower: 470000, upper: 495000 },
  { month: "Feb", actual: 497000, predicted: 495000, lower: 482000, upper: 510000 },
  { month: "Mar", actual: 512000, predicted: 510000, lower: 495000, upper: 525000 },
  { month: "Apr", predicted: 528000, lower: 510000, upper: 545000 },
  { month: "May", predicted: 545000, lower: 525000, upper: 565000 },
  { month: "Jun", predicted: 562000, lower: 540000, upper: 585000 },
  { month: "Jul", predicted: 580000, lower: 555000, upper: 605000 },
  { month: "Aug", predicted: 598000, lower: 570000, upper: 625000 },
];

const spendingForecast = [
  { month: "Jan", actual: 55000, predicted: 54000 },
  { month: "Feb", actual: 58000, predicted: 57000 },
  { month: "Mar", actual: 62000, predicted: 61000 },
  { month: "Apr", predicted: 64000 },
  { month: "May", predicted: 66000 },
  { month: "Jun", predicted: 68000 },
  { month: "Jul", predicted: 70000 },
  { month: "Aug", predicted: 71000 },
];

const scenarios = [
  {
    name: "Conservative Spending",
    description: "Reduce monthly expenses by 15%",
    impact: "+₹1,45,000 in 6 months",
    color: "emerald"
  },
  {
    name: "Increase Savings Rate",
    description: "Save 35% of income instead of 20%",
    impact: "+₹2,10,000 in 6 months",
    color: "indigo"
  },
  {
    name: "Side Income",
    description: "Add ₹15,000/month freelance income",
    impact: "+₹90,000 in 6 months",
    color: "purple"
  },
];

export function ForecastingPage() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Financial Forecasting</h1>
        <p className="text-slate-600 dark:text-slate-400">AI-powered predictions for your financial future</p>
      </div>

      {/* Forecast Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Positive</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">6-Month Balance Forecast</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹5,98,000</p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">+₹1,12,770 projected growth</p>
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
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Predicted Monthly Spending</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹71,000</p>
          <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">+9% increase trend</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
              <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">Excellent</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Forecast Confidence</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">94.2%</p>
          <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-2">LSTM + Prophet model</p>
        </div>
      </div>

      {/* Balance Forecast Chart */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Balance Forecast Timeline</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Predicted balance with confidence intervals</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
              <span className="text-slate-600 dark:text-slate-400">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-indigo-500"></div>
              <span className="text-slate-600 dark:text-slate-400">Predicted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-12 rounded bg-purple-500/20"></div>
              <span className="text-slate-600 dark:text-slate-400">Confidence Range</span>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="colorRange" x1="0" y1="0" x2="0" y2="1">
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
            <Area type="monotone" dataKey="upper" stroke="transparent" fill="url(#colorRange)" />
            <Area type="monotone" dataKey="lower" stroke="transparent" fill="url(#colorRange)" />
            <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} />
            <Line type="monotone" dataKey="predicted" stroke="#6366F1" strokeWidth={3} strokeDasharray="5 5" dot={{ fill: '#6366F1', r: 5 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Spending Forecast */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Monthly Spending Forecast</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={spendingForecast}>
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
            <Line type="monotone" dataKey="actual" stroke="#10B981" strokeWidth={3} name="Actual Spending" />
            <Line type="monotone" dataKey="predicted" stroke="#F59E0B" strokeWidth={3} strokeDasharray="5 5" name="Predicted Spending" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Scenario Simulation */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Scenario Simulation</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              onClick={() => setSelectedScenario(scenario.name)}
              className={`p-6 rounded-2xl cursor-pointer transition-all ${
                selectedScenario === scenario.name
                  ? `bg-${scenario.color}-500/20 border-2 border-${scenario.color}-500`
                  : "bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:border-white/40 dark:hover:border-white/20"
              } backdrop-blur-xl`}
            >
              <div className={`h-12 w-12 rounded-xl bg-gradient-to-br from-${scenario.color}-500 to-${scenario.color}-600 flex items-center justify-center mb-4`}>
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{scenario.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{scenario.description}</p>
              <div className={`px-3 py-2 rounded-lg bg-${scenario.color}-500/20 border border-${scenario.color}-500/30`}>
                <p className={`text-sm font-medium text-${scenario.color}-600 dark:text-${scenario.color}-400`}>
                  {scenario.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Prediction */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 backdrop-blur-xl">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">AI Risk Prediction</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-900 dark:text-white">Overspending Risk (Next Month)</span>
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">28% - Low</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className="h-full w-[28%] rounded-full bg-gradient-to-r from-orange-500 to-red-500"></div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Your spending is well-controlled. Continue monitoring food & dining expenses to maintain low risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
