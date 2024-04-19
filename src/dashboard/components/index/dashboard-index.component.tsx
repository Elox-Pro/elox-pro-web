import { useAuth } from "../../../auth/hooks/auth.hook"

export default function DashboardIndex() {
  const authContext = useAuth()
  const { activeUser } = authContext

  return <h1>Dashboard Index: {activeUser.sub}</h1>
}
