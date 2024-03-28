import { createBrowserRouter } from "react-router-dom"
import AuthRoutes from "../../auth/routes/auth.routes"
import DashboardRoutes from "../../dashboard/routes/dashboard.routes."
import ErrorRoutes from "../../errors/routes/error.routes."
import CoverRoutes from "../../cover/routes/cover.routes"
import TfaRoutes from "../../tfa/routes/tfa.routes"

export const AppRoutes = createBrowserRouter([
  ...CoverRoutes,
  ...AuthRoutes,
  ...TfaRoutes,
  ...DashboardRoutes,
  ...ErrorRoutes,
])
