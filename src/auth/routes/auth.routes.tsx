import AuthLayout from "../components/layout/auth-layout.component"
import AuthGuard from "../guards/auth.guard"
import Signup from "../components/signup/signup.component"
import Login from "../components/login/login.component"
import VaildateTfa from "../components/validate-tfa/validate-tfa.component"
import Auth from "../components/auth/auth.component"

const AuthRoutes = [
  {
    path: "/auth/",
    element: (
      <AuthGuard>
        <AuthLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "/auth/",
        element: <Auth />,
      },
      {
        index: true,
        path: "/auth/signin/",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
      {
        path: "/auth/tfa",
        element: <VaildateTfa />,
      },
    ],
  },
]

export default AuthRoutes
