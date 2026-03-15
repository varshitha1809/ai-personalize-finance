import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, TrendingDown } from "lucide-react";

const API = "http://127.0.0.1:8000";

const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();
const monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function CalendarPage() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [expenses, setExpenses] = useState<any[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${API}/expenses`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(d => setExpenses(Array.isArray(d) ? d : []))
      .catch(() => setExpenses([]));
  }, []);

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

  // Map expenses to day numbers (expenses have no date field, so we spread them across days for display)
  // Since Expense model has no date, we group by id % daysInMonth as a fallback
  const getEventsForDay = (day: number) =>
    expenses.filter(e => (e.id % daysInMonth) + 1 === day);

  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const upcomingExpenses = expenses.slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Financial Calendar</h1>
          <p className="text-slate-600 dark:text-slate-400">Track your expenses across the month</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all">
            <ChevronLeft className="h-6 w-6 text-slate-900 dark:text-white" />
          </button>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            {monthNames[currentMonth]} {currentYear}
          </h2>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all">
            <ChevronRight className="h-6 w-6 text-slate-900 dark:text-white" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
            <div key={d} className="text-center py-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{d}</span>
            </div>
          ))}
          {emptyDays.map((_, i) => <div key={`e-${i}`} className="aspect-square" />)}
          {days.map(day => {
            const dayEvents = getEventsForDay(day);
            return (
              <div
                key={day}
                className={`aspect-square p-2 rounded-xl border transition-all cursor-pointer ${
                  dayEvents.length > 0
                    ? "bg-indigo-500/10 border-indigo-500/30 hover:bg-indigo-500/20"
                    : "bg-white/40 dark:bg-white/5 border-white/20 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10"
                }`}
              >
                <div className="flex flex-col h-full">
                  <span className="text-sm font-medium text-slate-900 dark:text-white mb-1">{day}</span>
                  <div className="flex-1 flex flex-col gap-0.5">
                    {dayEvents.slice(0, 2).map((e, idx) => (
                      <div key={idx} className="text-xs px-1.5 py-0.5 rounded bg-red-500/20 text-red-700 dark:text-red-300">
                        {e.title.length > 10 ? e.title.substring(0, 10) + "..." : e.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-xs text-slate-600 dark:text-slate-400">+{dayEvents.length - 2} more</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Your Expenses</h3>
        {upcomingExpenses.length === 0 ? (
          <p className="text-slate-500">No expenses yet.</p>
        ) : (
          <div className="space-y-3">
            {upcomingExpenses.map((e, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl hover:border-indigo-500/50 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-red-500 to-orange-500">
                      <TrendingDown className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{e.title}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{e.category}</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-red-600 dark:text-red-400">-₹{e.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
