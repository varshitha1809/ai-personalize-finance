import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./components/theme-provider";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="finance-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
