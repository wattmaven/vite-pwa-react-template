import PWABadge from "@/components/pwa-badge";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <PWABadge />
      <TanStackRouterDevtools />
    </>
  ),
});
