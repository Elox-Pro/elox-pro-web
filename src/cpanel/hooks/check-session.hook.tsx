import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../auth/features/auth.slice";
import { getSession } from "../../auth/helpers/get-session.helper";
import { setShowSessionExpiryModal } from "../features/cp.slice";

const TIME_OUT_IN_MS = 1 * 60 * 1000;
export function useCheckSession() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Use effect to check the session from cookies periodically
    useEffect(() => {

        const checkSession = () => {

            const { activeUser } = getSession();
            if (activeUser === null) {
                dispatch(logout())
                navigate("/auth/signin/", { replace: true });
            } else {
                const currentTime = Date.now();
                const timeDifference = activeUser.exp - currentTime;

                if (timeDifference <= TIME_OUT_IN_MS) {
                    dispatch(setShowSessionExpiryModal(true));
                }
            }
        }

        checkSession();

        // Check session every 5 minutes
        const interval = setInterval(checkSession, TIME_OUT_IN_MS);

        // Clean up interval on component unmount
        return () => clearInterval(interval);

    }, []);

    return true;
}