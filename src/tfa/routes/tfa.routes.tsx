import AuthLayout from "../../auth/components/layout/auth-layout.component"
import VaildateTfa from "../../tfa/components/validate-tfa/validate-tfa.component"
import Tfa from "../components/tfa/auth.component"

const TfaRoutes = [
  {
    path: "/tfa/",
    element: <AuthLayout />,
    children: [
      {
        path: "/tfa/",
        element: <Tfa />,
      },
      {
        index: true,
        path: "/tfa/validate",
        element: <VaildateTfa />,
      },
    ],
  },
]

export default TfaRoutes
