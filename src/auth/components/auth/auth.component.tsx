import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Auth() {
  const navigate = useNavigate()
  useEffect(() => {
    navigate("/auth/signin")
  }, [])
  return null
}
