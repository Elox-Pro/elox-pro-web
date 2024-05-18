import { Outlet, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks/app.hooks"
import { HttpStatus } from "../../common/constants/common.constants"
import { ReactNode, useEffect } from "react"
import { toast } from "react-toastify";
import { clearError } from "../features/error.slice";

type ErrorGuardProps = {
  children?: ReactNode
}
export default function ErrorGuard({ children }: ErrorGuardProps) {
  const navigate = useNavigate();
  const error = useAppSelector((state) => state.error);
  const dispath = useAppDispatch();

  useEffect(() => {
    if (error && error.code === HttpStatus.UNAUTHORIZED) {
      navigate("/error/401", { replace: true });
    } else {
      toast.error(error.message);
    }
    dispath(clearError())
  }, [error, navigate]);

  return children || <Outlet />;
}