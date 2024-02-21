import { useEffect } from "react"
import { useGetProfileQuery } from "../../api/user.api"

export default function UserIndex() {
  const { data, error, isLoading } = useGetProfileQuery("yonax73")

  // console.log(data)
  // console.log(error)
  // console.log(isLoading)

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  return <h1>User Index {data && data.user.email} </h1>
}
