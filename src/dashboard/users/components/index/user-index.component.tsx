import { useEffect } from "react"
import { useGetProfileQuery } from "../../api/user.api"
import { useNavigate } from "react-router-dom"
import { useHandleError } from "../../../../common/helpers/handle-error.helper"

export default function UserIndex() {
  const navigate = useNavigate()
  const { data, error, isLoading } = useGetProfileQuery("yonax73")

  useEffect(() => {
    const errorResponse = useHandleError(error)
    if (errorResponse.data.statusCode === 401) {
      navigate("/errors/401", { replace: true })
    }
  }, [error])

  return <h1>User Index {data && data.user.email} </h1>
}
