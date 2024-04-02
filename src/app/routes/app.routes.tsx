import { createBrowserRouter } from "react-router-dom"
import AuthRoutes from "../../auth/routes/auth.routes"
import DashboardRoutes from "../../dashboard/routes/dashboard.routes."
import ErrorRoutes from "../../errors/routes/error.routes."
import CoverRoutes from "../../cover/routes/cover.routes"
import TfaRoutes from "../../tfa/routes/tfa.routes"
import RecoverPasswordRoutes from "../../recover-password/routes/recover-password.routes"

export const AppRoutes = createBrowserRouter([
  ...CoverRoutes,
  ...AuthRoutes,
  ...TfaRoutes,
  ...RecoverPasswordRoutes,
  ...DashboardRoutes,
  ...ErrorRoutes,
])
