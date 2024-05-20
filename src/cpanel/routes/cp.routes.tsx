import CPLayout from "../components/layout/cp-layout.component"
import DashboardIndex from "../../dashboard/components/index/dashboard-index.component"
import ProfileIndex from "../../profile/components/index/profile-index.component"
import { Navigate } from "react-router-dom"
import CPGuard from "../guards/cp.guard"
import CompanyIndex from "../../company/components/index/company-index.component"

const CPRoutes = [
  {
    path: "/cpanel",
    element: <Navigate to="/cpanel/dashboard" replace />,
  },
  {
    path: "/cpanel",
    element: <CPGuard><CPLayout /></CPGuard>,
    children: [
      {
        path: "/cpanel/dashboard",
        element: <DashboardIndex />,
      },
      {
        path: "/cpanel/profile",
        element: <ProfileIndex />,
      },
      {
        path: "/cpanel/companies",
        element: <CompanyIndex />
      }
    ],
  },
]

export default CPRoutes
