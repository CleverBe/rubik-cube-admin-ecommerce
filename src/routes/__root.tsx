import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider>
      <Header />
      <main className="max-w-screen-2xl mx-auto p-4">
        <Outlet />
      </main>
      <Toaster richColors position="bottom-right" />
    </ThemeProvider>
  ),
});
