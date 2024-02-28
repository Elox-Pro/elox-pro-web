import DashboardLayout from "../components/layout/dashboard-layout.component"
import DashboardIndex from "../children/home/components/index/dashboard-index.component"
import UserIndex from "../children/users/components/index/user-index.component"
import { Navigate } from "react-router-dom"
import DashboardGuard from "../guards/dashboard.guard."

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
