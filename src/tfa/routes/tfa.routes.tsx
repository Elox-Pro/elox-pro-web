import AuthLayout from "../../auth/components/layout/auth-layout.component"
import VaildateTfa from "../../tfa/components/validate-tfa/validate-tfa.component"
import TfaIndex from "../components/tfa-index/tfa-index.component"

const TfaRoutes = [
  {
    path: "/tfa/",
    element: <AuthLayout />,
    children: [
      {
        path: "/tfa/",
        element: <TfaIndex />,
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
