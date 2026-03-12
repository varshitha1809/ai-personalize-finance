import { Sparkles, TrendingDown, Lightbulb } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const budgetData = [
  { category: "Food & Dining", allocated: 20000, spent: 18500, color: "#4F46E5" },
  { category: "Transportation", allocated: 8000, spent: 7200, color: "#10B981" },
  { category: "Shopping", allocated: 15000, spent: 16200, color: "#A855F7" },
  { category: "Bills & Utilities", allocated: 12000, spent: 11500, color: "#F59E0B" },
  { category: "Entertainment", allocated: 5000, spent: 4800, color: "#EC4899" },
  { category: "Savings", allocated: 25000, spent: 22000, color: "#06B6D4" },
];

const aiRecommendations = [
  {
    title: "Reduce Dining Expenses by 15%",
    description: "You're spending ₹5,400 more on dining out compared to similar users. Cooking at home 3 more times per week could save you.",
    savings: "₹32,000/year",
    difficulty: "Easy"
  },
  {
    title: "Optimize Subscription Services",
    description: "You have 8 active subscriptions. Canceling 2 rarely-used services can reduce monthly costs.",
    savings: "₹18,000/year",
    difficulty: "Easy"
  },
  {
    title: "Switch to Public Transport",
    description: "Using public transport 2 days per week instead of cab services can significantly reduce transportation costs.",
    savings: "₹24,000/year",
    difficulty: "Medium"
  },
];

export function BudgetPlannerPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Budget Planner</h1>
        <p className="text-slate-600 dark:text-slate-400">AI-recommended budget allocation and savings strategies</p>
      </div>

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Monthly Income</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹85,000</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Allocated Budget</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹85,000</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Actual Spending</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹80,200</p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-2">Under budget by ₹4,800</p>
        </div>
      </div>

      {/* Budget Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Budget Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={budgetData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, allocated }) => `${category}: ₹${allocated.toLocaleString()}`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="allocated"
              >
                {budgetData.map((entry, index) => (
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

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Category Progress</h3>
          <div className="space-y-4">
            {budgetData.map((item, index) => {
              const percentage = (item.spent / item.allocated) * 100;
              const isOverBudget = percentage > 100;
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-900 dark:text-white">{item.category}</span>
                    <span className={`text-sm font-medium ${
                      isOverBudget ? "text-red-600 dark:text-red-400" : "text-slate-600 dark:text-slate-400"
                    }`}>
                      ₹{item.spent.toLocaleString()} / ₹{item.allocated.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        isOverBudget ? "bg-gradient-to-r from-red-500 to-orange-500" : "bg-gradient-to-r from-emerald-500 to-teal-500"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-6">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">AI Budget Recommendations</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">Personalized strategies to increase your savings</p>
          </div>
        </div>

        <div className="space-y-4">
          {aiRecommendations.map((rec, index) => (
            <div key={index} className="p-6 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{rec.title}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{rec.description}</p>
                  <div className="flex items-center gap-4">
                    <div className="px-3 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Save {rec.savings}</span>
                    </div>
                    <div className="px-3 py-1 rounded-lg bg-indigo-500/20 border border-indigo-500/30">
                      <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{rec.difficulty}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Reasoning */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">AI Reasoning</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <TrendingDown className="h-5 w-5 text-indigo-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-slate-900 dark:text-white font-medium mb-1">
                Reducing dining expenses by 15% increases annual savings by ₹32,000
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Analysis shows you spend 22% more on dining compared to users with similar income levels. 
                By cooking at home 3 additional times per week, you can maintain your lifestyle while building savings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
