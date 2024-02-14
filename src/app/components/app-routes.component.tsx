import { createBrowserRouter } from "react-router-dom"
import AuthRoutes from "../../auth/components/auth-routes.component"
import DashboardRoutes from "../../dashboard/components/dashboard-routes.component"

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <div>Public pages (if any)</div>,
  },
  ...AuthRoutes,
  ...DashboardRoutes,
  {
    path: "*",
    element: <h1>Página no encontrada - Error 404</h1>,
  },
])
