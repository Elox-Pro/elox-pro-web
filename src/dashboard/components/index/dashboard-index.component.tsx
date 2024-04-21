import { redirect, useNavigate, useOutletContext } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks/app.hooks";
import { getActiveUserFromCookie } from "../../../auth/features/auth.slice";
import { useActiveUser } from "../../../auth/hooks/active-user.hook";
import { useAuth } from "../../../auth/hooks/auth.hook"

export default function DashboardIndex() {
  // const authContext = useAuth()
  // const { activeUser } = authContext

  // const { activeUser } = useAppSelector(state => state.auth);
  // if (!activeUser) {
  //   return null;
  // }
  // console.log("activeUser-2", activeUser);

  // const activeUser = getActiveUserFromCookie();
  // const navigate = useNavigate();
  const activeUser = useActiveUser();
  // console.log("dashboard active user", activeUser)
  // if (activeUser === null || !activeUser.isAuthenticated) {
  //   // return redirect("/error/401")
  //   return null;
  // }

  return <h1>Dashboard Index: {activeUser.username}</h1>
}
