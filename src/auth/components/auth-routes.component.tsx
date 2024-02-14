import AuthLayout from "./auth-layout.component"
import AuthIndex from "./auth-index.component"

const AuthRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
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
