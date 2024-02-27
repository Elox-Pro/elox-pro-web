import AuthLayout from "../layout/auth-layout.component"
import AuthIndex from "../index/auth-index.component"
import AuthGuard from "../guards/auth.guard.component"

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
