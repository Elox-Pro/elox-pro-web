import DashboardLayout from "../layout/dashboard-layout.component"
import DashboardIndex from "../../home/components/index/dashboard-index.component"
import UserIndex from "../../users/components/index/user-index.component"
import { Navigate } from "react-router-dom"
import DashboardGuard from "../guards/dashboard.guard.component"

const DashboardRoutes = [
  {
    path: "/dashboard",
    element: <Navigate to="/dashboard/home" replace />,
  },
  {
    path: "/dashboard",
    element: (
      <DashboardGuard>
        <DashboardLayout />
      </DashboardGuard>
    ),
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
