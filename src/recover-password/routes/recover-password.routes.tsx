import AuthLayout from "../../auth/components/layout/auth-layout.component"
import RecoverPasswordIndex from "../components/recover-password-index/recover-password-index.component"
import RecoverPasswordInit from "../components/recover-password-init/recover-password-init"
import RecoverPasswordReset from "../components/recover-password-reset/recover-password-reset"

const RecoverPasswordRoutes = [
  {
    path: "/recover-password/",
    element: <AuthLayout />,
    children: [
      {
        path: "/recover-password/",
        element: <RecoverPasswordIndex />,
      },
      {
        index: true,
        path: "/recover-password/init",
        element: <RecoverPasswordInit />,
      },
      {
        index: true,
        path: "/recover-password/reset",
        element: <RecoverPasswordReset />,
      },
    ],
  },
]

export default RecoverPasswordRoutes
