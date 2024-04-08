import { useEffect } from "react"
import { useGetProfileQuery } from "../../api/user.api"
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page"

export default function UserIndex() {

  const { data, error, isLoading, status } = useGetProfileQuery()

  useEffect(() => {
    console.log(data?.user)
  }, [data])

  return (
    <CPWrapperPage loading={isLoading} error={error} status={status}>
      <h1>User Index {data && data.user.email} </h1>
    </CPWrapperPage>
  )
}
