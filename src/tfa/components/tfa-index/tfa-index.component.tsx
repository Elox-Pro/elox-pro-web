import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function TfaIndex() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/tfa/validate")
  }, [])
  return <></>
}
