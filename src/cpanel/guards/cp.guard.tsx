import { ReactNode, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { setActiveUser } from "../../auth/features/auth.slice";
import { useActiveUser } from "../../auth/hooks/active-user.hook";
import { useDispatch } from "react-redux";
import { getSession } from "../../auth/helpers/get-session.helper";
import { useCheckSession } from "../hooks/check-session.hook";

/**
 * CPGuard component acts as an authentication guard for protected routes.
 *
 * - Renders child components (routes) if the user is authenticated (logged in).
 * - Redirects unauthenticated users to an error page (typically "/error/401").
 * - Handles user authentication based on both Redux state and cookies.
 *
 * @author Yonatan A Quintero R
 * @param {CPGuardProps} props - Component properties.
 * @returns {ReactNode} - The rendered component based on authentication status.
 */
type CPGuardProps = {
  children: ReactNode;
};

export default function CPGuard({ children }: CPGuardProps): ReactNode {
  const dispatch = useDispatch();
  const activeUser = useActiveUser();
  const checkSession = useCheckSession(); // Active check session interval
  const [renderedNode, setRenderedNode] = useState<ReactNode | null>(null);

  if (!checkSession) {
    console.warn("Check session doesn't work");
  }

  useEffect(() => {
    const session = getSession();

    if (session.activeUser === null) {
      setRenderedNode(<Navigate to="/error/401" replace />);
    } else {
      setRenderedNode(children || <Outlet />);

      //  rehydrating the active user from cookies
      if (activeUser.isAuthenticated === false) {
        dispatch(setActiveUser({ ...session.activeUser }));
      }

    }

  }, [activeUser]);

  // Return the rendered content based on authentication status
  return renderedNode;
}
