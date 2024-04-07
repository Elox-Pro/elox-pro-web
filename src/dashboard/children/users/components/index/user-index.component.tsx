import { useEffect } from "react"
import { useGetProfileQuery } from "../../api/user.api"
import { useNavigate } from "react-router-dom"
import { useHandleError } from "../../../../../common/helpers/handle-error.helper"
import { useAuth } from "../../../../../auth/providers/auth.provider"

export default function UserIndex() {
  const navigate = useNavigate()
  const authContext = useAuth()

  const { activeUser } = authContext

  const { data, error, isLoading } = useGetProfileQuery()

  useEffect(() => {
    const errorResponse = useHandleError(error)
    if (errorResponse.data.statusCode === 401) {
      navigate("/error/401", { replace: true })
    }
  }, [error])

  useEffect(() => {
    console.log(data?.user)
  },[data])

  return <h1>User Index {data && data.user.email} </h1>
}
