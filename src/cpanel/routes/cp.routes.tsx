import CPLayout from "../components/layout/cp-layout.component"
import DashboardIndex from "../../dashboard/components/index/dashboard-index.component"
import ProfileIndex from "../../profile/components/index/profile-index.component"
import { Navigate } from "react-router-dom"
import CPGuard from "../guards/cp.guard"
import { CompanyInfoIndex } from "../../company/components/company-info-index/company-info-index"
import CompanyListIndex from "../../company/components/company-list-index/company-list-index"

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
        element: <CompanyListIndex />
      },
      {
        path: "/cpanel/companies/:id",
        element: <CompanyInfoIndex />
      }
    ],
  },
]

export default CPRoutes
