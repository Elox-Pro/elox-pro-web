import DashboardLayout from "../layout/dashboard-layout.component"
import DashboardIndex from "../../home/components/index/dashboard-index.component"
import UserIndex from "../../users/components/index/user-index.component"
import { Navigate } from "react-router-dom"

const DashboardRoutes = [
  {
    path: "/dashboard",
    element: <Navigate to="/dashboard/home" replace />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/home",
        element: <DashboardIndex />,
      },
      {
        path: "/dashboard/user",
        element: <UserIndex />,
      },
    ],
  },
]

export default DashboardRoutes
