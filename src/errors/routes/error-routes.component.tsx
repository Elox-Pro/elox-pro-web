import Error401 from "../components/error-401/error-401.component"
import Error404 from "../components/error-404/error-404.component"

const ErrorRoutes = [
  {
    path: "/errors/401",
    element: <Error401 />,
  },
  {
    path: "*",
    element: <Error404 />,
  },
]

export default ErrorRoutes
