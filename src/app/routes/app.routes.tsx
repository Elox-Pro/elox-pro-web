import { createBrowserRouter } from "react-router-dom"
import AuthRoutes from "../../auth/routes/auth.routes"
import CPRoutes from "../../cpanel/routes/cp.routes"
import ErrorRoutes from "../../errors/routes/error.routes."
import CoverRoutes from "../../cover/routes/cover.routes"
import TfaRoutes from "../../tfa/routes/tfa.routes"
import RecoverPasswordRoutes from "../../recover-password/routes/recover-password.routes"
import ErrorGuard from "../../errors/guards/error.guard"

export const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <ErrorGuard />,
    children: [
      ...CoverRoutes,
      ...AuthRoutes,
      ...TfaRoutes,
      ...RecoverPasswordRoutes,
      ...CPRoutes,
      ...ErrorRoutes,
    ]
  }
])
