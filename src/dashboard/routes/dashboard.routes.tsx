import DashboardLayout from "../../cpanel/components/layout/dashboard-layout.component"
import DashboardIndex from "../children/home/components/index/dashboard-index.component"
import UserIndex from "../children/users/components/index/user-index.component"
import { Navigate } from "react-router-dom"
import DashboardGuard from "../guards/dashboard.guard."

const DashboardRoutes = [
  {
    path: "/cpanel",
    element: <Navigate to="/cpanel/dashboard" replace />,
  },
  {
    path: "/cpanel",
    element: (
      <DashboardGuard>
        <DashboardLayout />
      </DashboardGuard>
    ),
    children: [
      {
        path: "/cpanel/dashboard",
        element: <DashboardIndex />,
      },
      {
        path: "/cpanel/user",
        element: <UserIndex />,
      },
    ],
  },
]

export default DashboardRoutes
