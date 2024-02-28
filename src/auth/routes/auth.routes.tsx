import AuthLayout from "../components/layout/auth-layout.component"
import AuthIndex from "../components/index/auth-index.component"
import AuthGuard from "../guards/auth.guard"

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
        element: <AuthIndex />,
      },
      {
        path: "/auth/signup",
        element: <h1>Signup</h1>,
      },
    ],
  },
]

export default AuthRoutes
