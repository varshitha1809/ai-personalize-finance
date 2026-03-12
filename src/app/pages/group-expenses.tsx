import { useState } from "react";
import { Users, Plus, ArrowRight } from "lucide-react";

const groups = [
  {
    id: 1,
    name: "Goa Trip 2026",
    members: 5,
    totalExpense: 45000,
    yourShare: 9000,
    settled: false,
    image: "bg-gradient-to-br from-orange-500 to-pink-500"
  },
  {
    id: 2,
    name: "Office Team Lunch",
    members: 8,
    totalExpense: 6400,
    yourShare: 800,
    settled: true,
    image: "bg-gradient-to-br from-indigo-500 to-purple-500"
  },
  {
    id: 3,
    name: "Roommate Expenses",
    members: 3,
    totalExpense: 18500,
    yourShare: 6200,
    settled: false,
    image: "bg-gradient-to-br from-emerald-500 to-teal-500"
  },
];

const settlements = [
  { name: "Rahul Kumar", owes: 2500, direction: "owes-you" },
  { name: "Priya Sharma", owes: 1800, direction: "you-owe" },
  { name: "Amit Patel", owes: 3200, direction: "owes-you" },
];

export function GroupExpensesPage() {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Group Expenses</h1>
          <p className="text-slate-600 dark:text-slate-400">Share and settle expenses with friends and family</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all">
          <Plus className="h-5 w-5" />
          Create Group
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total You're Owed</p>
          <p className="text-3xl font-semibold text-emerald-600 dark:text-emerald-400">₹5,700</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total You Owe</p>
          <p className="text-3xl font-semibold text-orange-600 dark:text-orange-400">₹1,800</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Net Balance</p>
          <p className="text-3xl font-semibold text-slate-900 dark:text-white">₹3,900</p>
        </div>
      </div>

      {/* Groups */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Your Groups</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group) => (
            <div
              key={group.id}
              onClick={() => setSelectedGroup(group.id)}
              className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl hover:border-indigo-500/50 transition-all cursor-pointer"
            >
              <div className={`h-16 w-16 rounded-xl ${group.image} flex items-center justify-center mb-4`}>
                <Users className="h-8 w-8 text-white" />
              </div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{group.name}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{group.members} members</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Total Expense</span>
                  <span className="font-medium text-slate-900 dark:text-white">₹{group.totalExpense.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Your Share</span>
                  <span className="font-medium text-slate-900 dark:text-white">₹{group.yourShare.toLocaleString()}</span>
                </div>
              </div>
              <div className="mt-4">
                {group.settled ? (
                  <div className="px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-center">
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Settled</span>
                  </div>
                ) : (
                  <div className="px-3 py-2 rounded-lg bg-orange-500/20 border border-orange-500/30 text-center">
                    <span className="text-sm font-medium text-orange-600 dark:text-orange-400">Pending</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settlement Chart */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Who Owes Whom</h3>
        <div className="space-y-4">
          {settlements.map((settlement, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 dark:bg-white/5">
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-medium ${
                  settlement.direction === "owes-you" 
                    ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                    : "bg-gradient-to-br from-orange-500 to-red-500"
                }`}>
                  {settlement.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">{settlement.name}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {settlement.direction === "owes-you" ? "Owes you" : "You owe"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-lg font-semibold ${
                  settlement.direction === "owes-you"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-orange-600 dark:text-orange-400"
                }`}>
                  ₹{settlement.owes.toLocaleString()}
                </span>
                <button className="p-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 transition-colors">
                  <ArrowRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
