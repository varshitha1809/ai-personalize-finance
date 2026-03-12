import { useState } from "react";
import { Plus, Mic, Search, Filter, Download, Brain, Sparkles } from "lucide-react";

const transactions = [
  { id: 1, date: "2026-03-12", category: "Food & Dining", merchant: "Starbucks", amount: -450, type: "expense", aiCategorized: true },
  { id: 2, date: "2026-03-11", category: "Transportation", merchant: "Uber", amount: -280, type: "expense", aiCategorized: true },
  { id: 3, date: "2026-03-10", category: "Shopping", merchant: "Amazon", amount: -2450, type: "expense", aiCategorized: true },
  { id: 4, date: "2026-03-10", category: "Salary", merchant: "Company Inc.", amount: 85000, type: "income", aiCategorized: false },
  { id: 5, date: "2026-03-09", category: "Food & Dining", merchant: "Domino's Pizza", amount: -680, type: "expense", aiCategorized: true },
  { id: 6, date: "2026-03-09", category: "Bills & Utilities", merchant: "Electricity Board", amount: -2500, type: "expense", aiCategorized: true },
  { id: 7, date: "2026-03-08", category: "Entertainment", merchant: "Netflix", amount: -649, type: "expense", aiCategorized: true },
  { id: 8, date: "2026-03-07", category: "Shopping", merchant: "Nike Store", amount: -4200, type: "expense", aiCategorized: true },
];

const categories = [
  { name: "All", color: "bg-slate-500" },
  { name: "Food & Dining", color: "bg-indigo-500" },
  { name: "Transportation", color: "bg-emerald-500" },
  { name: "Shopping", color: "bg-purple-500" },
  { name: "Bills & Utilities", color: "bg-orange-500" },
  { name: "Entertainment", color: "bg-pink-500" },
];

export function ExpensesPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTransactions = transactions.filter(t => {
    const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
    const matchesSearch = t.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Expense Tracker</h1>
          <p className="text-slate-600 dark:text-slate-400">Track and manage all your transactions</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowVoiceModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
          >
            <Mic className="h-5 w-5" />
            Voice Log
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
          >
            <Plus className="h-5 w-5" />
            Add Expense
          </button>
        </div>
      </div>

      {/* AI Smart Categorization Banner */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Brain className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-slate-900 dark:text-white">AI Smart Categorization Active</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Using machine learning to automatically categorize your transactions with 98% accuracy
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
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
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all">
          <Filter className="h-5 w-5" />
          Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 text-slate-900 dark:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all">
          <Download className="h-5 w-5" />
          Export
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedCategory === category.name
                ? `${category.color} text-white shadow-lg`
                : "bg-white/60 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-white/80 dark:hover:bg-white/10"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20 dark:border-white/10">
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">Date</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">Category</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">Merchant</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">Type</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-white/10 dark:border-white/5 hover:bg-white/40 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{transaction.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-900 dark:text-white">{transaction.category}</span>
                      {transaction.aiCategorized && (
                        <div className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 flex items-center gap-1">
                          <Sparkles className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
                          <span className="text-xs text-indigo-600 dark:text-indigo-400">AI</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">{transaction.merchant}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                      transaction.type === "income" 
                        ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30"
                    }`}>
                      {transaction.type}
                    </div>
                  </td>
                  <td className={`px-6 py-4 text-right text-sm font-semibold ${
                    transaction.amount > 0 
                      ? "text-emerald-600 dark:text-emerald-400" 
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {transaction.amount > 0 ? "+" : ""}₹{Math.abs(transaction.amount).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Voice Recording Modal */}
      {showVoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-slate-900 border border-white/20">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Voice Expense Logging</h2>
            
            <div className="flex flex-col items-center gap-6 py-8">
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`h-32 w-32 rounded-full flex items-center justify-center transition-all ${
                  isRecording
                    ? "bg-gradient-to-br from-red-500 to-pink-500 animate-pulse shadow-lg shadow-red-500/50"
                    : "bg-gradient-to-br from-emerald-500 to-teal-500 hover:shadow-lg hover:shadow-emerald-500/50"
                }`}
              >
                <Mic className="h-16 w-16 text-white" />
              </button>
              
              {isRecording && (
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="h-2 w-2 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              )}
              
              <div className="text-center">
                <p className="text-slate-900 dark:text-white font-medium mb-2">
                  {isRecording ? "Listening..." : "Tap to start recording"}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Example: "Spent 450 rupees on groceries today"
                </p>
              </div>
            </div>

            {isRecording && (
              <div className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Transcription:</p>
                <p className="text-slate-900 dark:text-white">"Spent 450 rupees on groceries today"</p>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowVoiceModal(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
              >
                Cancel
              </button>
              <button
                disabled={!isRecording}
                className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all disabled:opacity-50"
              >
                Save Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
