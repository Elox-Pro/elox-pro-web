import DashboardLayout from "../layout/dashboard-layout.component"
import DashboardIndex from "../../home/components/index/dashboard-index.component"
import UserIndex from "../../users/components/index/user-index.component"

const DashboardRoutes = [
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
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
