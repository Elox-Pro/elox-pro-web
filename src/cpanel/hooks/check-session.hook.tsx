import { useNavigate } from "react-router-dom";
import { useActiveUser } from "../../auth/hooks/active-user.hook";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getActiveUserFromCookies } from "../../auth/helpers/get-active-user-from-cookies.helper";
import { logout } from "../../auth/features/auth.slice";

export default function useCheckSession() {

    const navigate = useNavigate();
    const activeUser = useActiveUser();
    const dispatch = useDispatch();

    // Use effect to check the session from cookies periodically
    useEffect(() => {

        const checkSession = () => {
            if (activeUser.isAuthenticated) {
                const activeUserAux = getActiveUserFromCookies();
                if (activeUserAux === null) {
                    dispatch(logout())
                    navigate("/auth/signin/", { replace: true });
                }
            }
        }

        checkSession();

        // Check session every 5 minutes
        const interval = setInterval(checkSession, 5 * 60 * 1000);

        // Clean up interval on component unmount
        return () => clearInterval(interval);

    }, []);

    return true;
}