import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks/app.hooks"
export default function ErrorGuard() {
  const navigate = useNavigate()
  const error = useAppSelector((state) => state.someSlice.error)

  useEffect(() => {
    if (error && error.status === 401) {
      navigate("/401")
    }
  }, [error, navigate])

  return null // This component doesn't render anything visible
}
