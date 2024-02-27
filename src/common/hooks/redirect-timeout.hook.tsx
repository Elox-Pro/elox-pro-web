import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

type RedirectTimeoutProps = {
  delayInSeconds: number
  page: string
}

export default function useRedirectTimeout({ delayInSeconds, page }: RedirectTimeoutProps) {
  const navigate = useNavigate()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate(page, { replace: true })
    }, delayInSeconds * 1000)

    setIsRedirecting(true)

    return () => {
      clearTimeout(timeoutId)
      setIsRedirecting(false)
    }
  }, [navigate, delayInSeconds])

  return { isRedirecting }
}
