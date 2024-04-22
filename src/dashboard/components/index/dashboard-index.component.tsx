import { useActiveUser } from "../../../auth/hooks/active-user.hook";

export default function DashboardIndex() {
  const activeUser = useActiveUser();
  return <h1>Dashboard Index: {activeUser.username}</h1>
}
