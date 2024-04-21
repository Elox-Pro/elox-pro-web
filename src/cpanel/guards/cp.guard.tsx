import { ReactNode, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getActiveUserFromCookie, setActiveUser } from "../../auth/features/auth.slice";
import { useActiveUser } from "../../auth/hooks/active-user.hook";
import { useDispatch } from "react-redux";

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
  const [renderedNode, setRenderedNode] = useState<ReactNode | null>(null); 

  // useEffect hook for side effects based on authentication changes
  useEffect(() => {
    const handleAuthentication = async () => {
      if (activeUser.isAuthenticated) {
        // User is already authenticated (from Redux state)
        setRenderedNode(children || <Outlet />);
      } else {
        // Check for user information in cookies
        const userFromCookie = getActiveUserFromCookie();

        if (!userFromCookie?.isAuthenticated) {
          // User is not authenticated based on cookie or cookie is missing
          setRenderedNode(<Navigate to="/error/401" replace />);
        } else {
          // User is potentially authenticated based on cookie
          dispatch(setActiveUser({ ...userFromCookie }));
          setRenderedNode(children || <Outlet />);
        }
      }
    };

    handleAuthentication();
  }, [activeUser.isAuthenticated, children, dispatch]);

  // Return the rendered content based on authentication status
  return renderedNode;
}
