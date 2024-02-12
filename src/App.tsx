import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.min.css"
import { useGetTestQuery } from "./auth/api/auth.api"
import AuthIndex from "./auth/components/auth-index.component"

function App() {
  const { data } = useGetTestQuery()
  console.log(data)

  return <AuthIndex />
}

export default App
