import { createBrowserRouter } from "react-router";
import { MainLayout } from "./components/layout/main-layout";
import { LandingPage } from "./pages/landing";
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";
import { DashboardPage } from "./pages/dashboard";
import { ExpensesPage } from "./pages/expenses";
import { AIAssistantPage } from "./pages/ai-assistant";
import { ForecastingPage } from "./pages/forecasting";
import { BudgetPlannerPage } from "./pages/budget-planner";
import { GroupExpensesPage } from "./pages/group-expenses";
import { ReceiptsPage } from "./pages/receipts";
import { CalendarPage } from "./pages/calendar";
import { ReportsPage } from "./pages/reports";
import { SettingsPage } from "./pages/settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "expenses", element: <ExpensesPage /> },
      { path: "ai-assistant", element: <AIAssistantPage /> },
      { path: "forecasting", element: <ForecastingPage /> },
      { path: "budget-planner", element: <BudgetPlannerPage /> },
      { path: "group-expenses", element: <GroupExpensesPage /> },
      { path: "receipts", element: <ReceiptsPage /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "reports", element: <ReportsPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
]);
