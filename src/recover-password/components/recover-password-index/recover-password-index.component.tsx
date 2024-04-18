import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function RecoverPasswordIndex() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/recover-password/init")
  }, [])
  return null
}
