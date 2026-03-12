import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, DollarSign, TrendingDown, TrendingUp } from "lucide-react";

const events = [
  { date: 12, type: "expense", title: "Electricity Bill", amount: 2500, category: "bills" },
  { date: 15, type: "income", title: "Salary", amount: 85000, category: "income" },
  { date: 18, type: "expense", title: "Rent Payment", amount: 15000, category: "bills" },
  { date: 20, type: "expense", title: "Car EMI", amount: 12000, category: "emi" },
  { date: 22, type: "expense", title: "Netflix Subscription", amount: 649, category: "subscription" },
  { date: 25, type: "expense", title: "Internet Bill", amount: 999, category: "bills" },
  { date: 28, type: "expense", title: "Credit Card Payment", amount: 8500, category: "bills" },
];

const getDaysInMonth = (month: number, year: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month: number, year: number) => {
  return new Date(year, month, 1).getDay();
};

export function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(2); // March (0-indexed)
  const [currentYear, setCurrentYear] = useState(2026);
  const [view, setView] = useState<"month" | "week">("month");

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getEventsForDay = (day: number) => {
    return events.filter(e => e.date === day);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white mb-2">Financial Calendar</h1>
          <p className="text-slate-600 dark:text-slate-400">Track income, bills, and recurring transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView("month")}
            className={`px-4 py-2 rounded-lg transition-all ${
              view === "month"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                : "bg-white/60 dark:bg-white/5 text-slate-900 dark:text-white"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setView("week")}
            className={`px-4 py-2 rounded-lg transition-all ${
              view === "week"
                ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
                : "bg-white/60 dark:bg-white/5 text-slate-900 dark:text-white"
            }`}
          >
            Week
          </button>
        </div>
      </div>

      {/* Calendar Header */}
      <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={prevMonth}
            className="p-2 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-slate-900 dark:text-white" />
          </button>
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Click on dates to view details</p>
          </div>
          <button
            onClick={nextMonth}
            className="p-2 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all"
          >
            <ChevronRight className="h-6 w-6 text-slate-900 dark:text-white" />
          </button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center py-2">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{day}</span>
            </div>
          ))}
          
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="aspect-square"></div>
          ))}
          
          {days.map((day) => {
            const dayEvents = getEventsForDay(day);
            const hasIncome = dayEvents.some(e => e.type === "income");
            const hasExpense = dayEvents.some(e => e.type === "expense");
            
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
                    {dayEvents.slice(0, 2).map((event, idx) => (
                      <div
                        key={idx}
                        className={`text-xs px-1.5 py-0.5 rounded ${
                          event.type === "income"
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                            : "bg-red-500/20 text-red-700 dark:text-red-300"
                        }`}
                      >
                        {event.title.length > 10 ? event.title.substring(0, 10) + "..." : event.title}
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

      {/* Upcoming Events */}
      <div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Upcoming Events</h3>
        <div className="space-y-3">
          {events.slice(0, 5).map((event, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-white/60 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-xl hover:border-indigo-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                    event.type === "income"
                      ? "bg-gradient-to-br from-emerald-500 to-teal-500"
                      : "bg-gradient-to-br from-red-500 to-orange-500"
                  }`}>
                    {event.type === "income" ? (
                      <TrendingUp className="h-6 w-6 text-white" />
                    ) : (
                      <TrendingDown className="h-6 w-6 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{event.title}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {monthNames[currentMonth]} {event.date}, {currentYear}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${
                    event.type === "income"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-red-600 dark:text-red-400"
                  }`}>
                    {event.type === "income" ? "+" : "-"}₹{event.amount.toLocaleString()}
                  </p>
                  <div className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 mt-1">
                    <span className="text-xs text-slate-600 dark:text-slate-400 capitalize">{event.category}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
