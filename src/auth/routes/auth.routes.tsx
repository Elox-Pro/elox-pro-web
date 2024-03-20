import AuthLayout from "../components/layout/auth-layout.component"
import AuthIndex from "../components/index/auth-index.component"
import AuthGuard from "../guards/auth.guard"
import Signup from "../components/signup/signup.component"
import Login from "../components/login/login.component"

const AuthRoutes = [
  {
    path: "/auth",
    element: (
      <AuthGuard>
        <AuthLayout />
      </AuthGuard>
    ),
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <Signup />,
      },
    ],
  },
]

export default AuthRoutes
