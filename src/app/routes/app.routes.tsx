import { createBrowserRouter } from "react-router-dom"
import AuthRoutes from "../../auth/routes/auth.routes"
import DashboardRoutes from "../../dashboard/routes/dashboard.routes."
import ErrorRoutes from "../../errors/routes/error.routes."

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
  ...ErrorRoutes,
])
