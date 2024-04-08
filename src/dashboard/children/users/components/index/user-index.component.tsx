import { useEffect } from "react"
import { useGetProfileQuery } from "../../api/user.api"
import WrapperPage from "../../../../components/wrapper-page/wrapper-page"

export default function UserIndex() {

  const { data, error, isLoading, status } = useGetProfileQuery()

  useEffect(() => {
    console.log(data?.user)
  }, [data])

  return (
    <WrapperPage loading={isLoading} error={error} status={status}>
      <h1>User Index {data && data.user.email} </h1>
    </WrapperPage>
  )
}
