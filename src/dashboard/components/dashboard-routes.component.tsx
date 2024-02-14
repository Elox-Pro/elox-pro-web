import DashboardLayout from "./dashboard-layout.component"
import DashboardIndex from "./dashboard-index.component"
import UserIndex from "../../users/components/user-index.component"

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
