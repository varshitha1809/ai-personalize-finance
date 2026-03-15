import { useEffect, useState } from "react";
import { Users, Plus, ArrowRight } from "lucide-react";

const API = "http://127.0.0.1:8000";
const GRADIENTS = [
  "bg-gradient-to-br from-orange-500 to-pink-500",
  "bg-gradient-to-br from-indigo-500 to-purple-500",
  "bg-gradient-to-br from-emerald-500 to-teal-500",
  "bg-gradient-to-br from-blue-500 to-cyan-500",
];

export function GroupExpensesPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [settlements, setSettlements] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");

  const token = localStorage.getItem("token");

  const fetchGroups = async () => {
    const res = await fetch(`${API}/groups`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setGroups(Array.isArray(data) ? data : []);
  };

  useEffect(() => { fetchGroups(); }, []);

  const handleSelectGroup = async (id: number) => {
    setSelectedGroup(id);
    const res = await fetch(`${API}/groups/${id}/settlements`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setSettlements(Array.isArray(data) ? data : []);
  };

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    await fetch(`${API}/groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: groupName }),
    });
    setGroupName("");
    setShowModal(false);
    fetchGroups();
  };

  const totalOwed = settlements.filter(s => s.direction === "owes-you").reduce((sum, s) => sum + s.owes, 0);
  const totalOwe = settlements.filter(s => s.direction === "you-owe").reduce((sum, s) => sum + s.owes, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Group Expenses</h1>
          <p className="text-slate-600 dark:text-slate-400">Share and settle expenses with friends and family</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg hover:shadow-indigo-500/50 transition-all"
        >
          <Plus className="h-5 w-5" /> Create Group
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total You're Owed</p>
          <p className="text-3xl font-semibold text-emerald-600 dark:text-emerald-400">₹{totalOwed.toLocaleString()}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Total You Owe</p>
          <p className="text-3xl font-semibold text-orange-600 dark:text-orange-400">₹{totalOwe.toLocaleString()}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Net Balance</p>
          <p className={`text-3xl font-semibold ${totalOwed - totalOwe >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500"}`}>
            ₹{(totalOwed - totalOwe).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Groups */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Your Groups</h3>
        {groups.length === 0 ? (
          <div className="p-12 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 text-center">
            <p className="text-slate-500">No groups yet. Click "Create Group" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map((group, i) => (
              <div
                key={group.id}
                onClick={() => handleSelectGroup(group.id)}
                className={`p-6 rounded-2xl bg-white/60 dark:bg-white/5 border backdrop-blur-xl hover:border-indigo-500/50 transition-all cursor-pointer ${selectedGroup === group.id ? "border-indigo-500/50" : "border-white/20 dark:border-white/10"}`}
              >
                <div className={`h-16 w-16 rounded-xl ${GRADIENTS[i % GRADIENTS.length]} flex items-center justify-center mb-4`}>
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{group.name}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{group.members} member{group.members !== 1 ? "s" : ""}</p>
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
        )}
      </div>

      {/* Settlements */}
      {selectedGroup && (
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Who Owes Whom</h3>
          {settlements.length === 0 ? (
            <p className="text-slate-500">No expenses in this group yet.</p>
          ) : (
            <div className="space-y-4">
              {settlements.map((s, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50/50 dark:bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center text-white font-medium ${s.direction === "owes-you" ? "bg-gradient-to-br from-emerald-500 to-teal-500" : "bg-gradient-to-br from-orange-500 to-red-500"}`}>
                      {s.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{s.name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{s.direction === "owes-you" ? "Owes you" : "You owe"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-lg font-semibold ${s.direction === "owes-you" ? "text-emerald-600 dark:text-emerald-400" : "text-orange-600 dark:text-orange-400"}`}>
                      ₹{s.owes.toLocaleString()}
                    </span>
                    <button className="p-2 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 transition-colors">
                      <ArrowRight className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create Group Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm p-8 rounded-2xl bg-white dark:bg-slate-900 border border-white/20">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Create Group</h2>
            <input
              type="text"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              placeholder="Group name"
              className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white">Cancel</button>
              <button onClick={handleCreateGroup} className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white">Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
