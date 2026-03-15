import { useEffect, useState } from "react";
import { Users, Plus, CheckCircle, Receipt, ChevronRight, X } from "lucide-react";

const API = "http://127.0.0.1:8000";
const GRADIENTS = [
  "from-orange-500 to-pink-500",
  "from-indigo-500 to-purple-500",
  "from-emerald-500 to-teal-500",
  "from-blue-500 to-cyan-500",
];

export function GroupExpensesPage() {
  const [groups, setGroups] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [bills, setBills] = useState<any[]>([]);
  const [settlements, setSettlements] = useState<any[]>([]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showBillModal, setShowBillModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [billForm, setBillForm] = useState({ title: "", amount: "" });

  const token = localStorage.getItem("token");

  const fetchGroups = async () => {
    const res = await fetch(`${API}/groups`, { headers: { Authorization: `Bearer ${token}` } });
    const data = await res.json();
    setGroups(Array.isArray(data) ? data : []);
  };

  const fetchGroupDetail = async (group: any) => {
    const [billsRes, settleRes] = await Promise.all([
      fetch(`${API}/groups/${group.id}/expenses`, { headers: { Authorization: `Bearer ${token}` } }),
      fetch(`${API}/groups/${group.id}/settlements`, { headers: { Authorization: `Bearer ${token}` } }),
    ]);
    const billsData = await billsRes.json();
    const settleData = await settleRes.json();
    setBills(Array.isArray(billsData) ? billsData : []);
    setSettlements(Array.isArray(settleData) ? settleData : []);
    // refresh group totals too
    const gRes = await fetch(`${API}/groups`, { headers: { Authorization: `Bearer ${token}` } });
    const gData = await gRes.json();
    const updated = Array.isArray(gData) ? gData : [];
    setGroups(updated);
    const fresh = updated.find((g: any) => g.id === group.id);
    if (fresh) setSelectedGroup(fresh);
  };

  useEffect(() => { fetchGroups(); }, []);

  const handleCreateGroup = async () => {
    if (!groupName.trim()) return;
    await fetch(`${API}/groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name: groupName }),
    });
    setGroupName("");
    setShowCreateModal(false);
    fetchGroups();
  };

  const handleAddBill = async () => {
    if (!billForm.title.trim() || !billForm.amount || !selectedGroup) return;
    await fetch(`${API}/groups/${selectedGroup.id}/expenses`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title: billForm.title, amount: parseFloat(billForm.amount) }),
    });
    setBillForm({ title: "", amount: "" });
    setShowBillModal(false);
    fetchGroupDetail(selectedGroup);
  };

  const handleSettle = async (expenseId: number) => {
    await fetch(`${API}/groups/${selectedGroup.id}/expenses/${expenseId}/settle`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchGroupDetail(selectedGroup);
  };

  const totalOwed = settlements.filter(s => s.direction === "owes-you" && !s.settled).reduce((sum, s) => sum + s.owes, 0);
  const totalOwe = settlements.filter(s => s.direction === "you-owe" && !s.settled).reduce((sum, s) => sum + s.owes, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Group Expenses</h1>
          <p className="text-slate-600 dark:text-slate-400">Split bills and settle up instantly</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:shadow-lg transition-all"
        >
          <Plus className="h-5 w-5" /> Create Group
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Groups List */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Your Groups</h3>
          {groups.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 text-center">
              <Users className="h-10 w-10 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No groups yet</p>
            </div>
          ) : (
            groups.map((group, i) => (
              <div
                key={group.id}
                onClick={() => { setSelectedGroup(group); fetchGroupDetail(group); }}
                className={`p-4 rounded-2xl border backdrop-blur-xl cursor-pointer transition-all ${
                  selectedGroup?.id === group.id
                    ? "border-indigo-500/50 bg-indigo-500/10"
                    : "border-white/20 dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-indigo-500/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-center justify-center flex-shrink-0`}>
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white truncate">{group.name}</p>
                    <p className="text-xs text-slate-500">{group.members} member{group.members !== 1 ? "s" : ""} · ₹{group.totalExpense.toLocaleString()}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 flex-shrink-0" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Group Detail */}
        <div className="lg:col-span-2 space-y-4">
          {!selectedGroup ? (
            <div className="p-12 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 text-center">
              <p className="text-slate-500">Select a group to view details</p>
            </div>
          ) : (
            <>
              {/* Group Header */}
              <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{selectedGroup.name}</h2>
                  <button
                    onClick={() => setShowBillModal(true)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm hover:shadow-lg transition-all"
                  >
                    <Plus className="h-4 w-4" /> Add Bill
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center">
                    <p className="text-xs text-slate-500 mb-1">Total Bills</p>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">₹{selectedGroup.totalExpense.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-center">
                    <p className="text-xs text-slate-500 mb-1">You're Owed</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">₹{totalOwed.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-orange-500/10 text-center">
                    <p className="text-xs text-slate-500 mb-1">You Owe</p>
                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400">₹{totalOwe.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Bills */}
              <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Shared Bills</h3>
                {bills.length === 0 ? (
                  <p className="text-slate-500 text-sm">No bills yet. Click "Add Bill" to split an expense.</p>
                ) : (
                  <div className="space-y-3">
                    {bills.map(bill => (
                      <div key={bill.id} className={`p-4 rounded-xl border transition-all ${bill.settled ? "opacity-50 border-white/10 dark:border-white/5" : "border-white/20 dark:border-white/10 bg-slate-50/50 dark:bg-white/5"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${bill.settled ? "bg-emerald-500/20" : "bg-indigo-500/20"}`}>
                              {bill.settled
                                ? <CheckCircle className="h-5 w-5 text-emerald-500" />
                                : <Receipt className="h-5 w-5 text-indigo-500" />}
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white text-sm">{bill.title}</p>
                              <p className="text-xs text-slate-500">Paid by {bill.paid_by_name} · ₹{bill.per_person.toLocaleString()}/person</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p className="font-semibold text-slate-900 dark:text-white">₹{bill.amount.toLocaleString()}</p>
                              <p className="text-xs text-slate-500">{bill.members} people</p>
                            </div>
                            {!bill.settled && (
                              <button
                                onClick={() => handleSettle(bill.id)}
                                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium transition-colors"
                              >
                                Settle
                              </button>
                            )}
                            {bill.settled && (
                              <span className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                                Settled ✓
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Who Owes Whom */}
              {settlements.length > 0 && (
                <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Who Owes Whom</h3>
                  <div className="space-y-3">
                    {settlements.map((s, i) => (
                      <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${s.settled ? "opacity-40" : ""} ${s.direction === "owes-you" ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-orange-500/10 border border-orange-500/20"}`}>
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold ${s.direction === "owes-you" ? "bg-gradient-to-br from-emerald-500 to-teal-500" : "bg-gradient-to-br from-orange-500 to-red-500"}`}>
                            {s.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900 dark:text-white">{s.name}</p>
                            <p className="text-xs text-slate-500">{s.direction === "owes-you" ? "owes you" : "you owe"}</p>
                          </div>
                        </div>
                        <p className={`font-bold ${s.direction === "owes-you" ? "text-emerald-600 dark:text-emerald-400" : "text-orange-600 dark:text-orange-400"}`}>
                          ₹{s.owes.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm p-8 rounded-2xl bg-white dark:bg-slate-900 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Create Group</h2>
              <button onClick={() => setShowCreateModal(false)}><X className="h-5 w-5 text-slate-400" /></button>
            </div>
            <input
              type="text"
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleCreateGroup()}
              placeholder="e.g. Goa Trip, Flat Expenses"
              className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
              autoFocus
            />
            <div className="flex gap-3">
              <button onClick={() => setShowCreateModal(false)} className="flex-1 px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white">Cancel</button>
              <button onClick={handleCreateGroup} className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Bill Modal */}
      {showBillModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-sm p-8 rounded-2xl bg-white dark:bg-slate-900 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Add Shared Bill</h2>
              <button onClick={() => setShowBillModal(false)}><X className="h-5 w-5 text-slate-400" /></button>
            </div>
            <div className="space-y-3 mb-4">
              <input
                type="text"
                value={billForm.title}
                onChange={e => setBillForm({ ...billForm, title: e.target.value })}
                placeholder="What was it? (e.g. Dinner, Hotel)"
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                autoFocus
              />
              <input
                type="number"
                value={billForm.amount}
                onChange={e => setBillForm({ ...billForm, amount: e.target.value })}
                placeholder="Total amount (₹)"
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {billForm.amount && selectedGroup?.members > 0 && (
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                  <p className="text-sm text-indigo-600 dark:text-indigo-400">
                    Each person pays <strong>₹{(parseFloat(billForm.amount) / selectedGroup.members).toFixed(2)}</strong> ({selectedGroup.members} members)
                  </p>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowBillModal(false)} className="flex-1 px-4 py-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white">Cancel</button>
              <button onClick={handleAddBill} className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium">Split Bill</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
