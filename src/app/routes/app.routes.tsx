import { createBrowserRouter } from "react-router-dom"
import AuthRoutes from "../../auth/routes/auth.routes"
import DashboardRoutes from "../../dashboard/routes/dashboard.routes."
import ErrorRoutes from "../../errors/routes/error.routes."
import CoverRoutes from "../../cover/routes/cover.routes"

export const AppRoutes = createBrowserRouter([...CoverRoutes, ...AuthRoutes, ...DashboardRoutes, ...ErrorRoutes])
