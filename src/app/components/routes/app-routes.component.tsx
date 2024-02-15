import { createBrowserRouter } from "react-router-dom"
import AuthRoutes from "../../../auth/components/routes/auth-routes.component"
import DashboardRoutes from "../../../dashboard/components/routes/dashboard-routes.component"

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <small>
        Make a page cover in memory of Yadir Edilio Quintero Rodríguez, Great Son, Brother, Husband and Father. With
        Love Yonatan A Quintero R
      </small>
    ),
  },
  ...AuthRoutes,
  ...DashboardRoutes,
  {
    path: "*",
    element: <h1>Página no encontrada - Error 404</h1>,
  },
])
