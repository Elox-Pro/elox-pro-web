import { useEffect, useState } from "react"
import { QueryStatus } from "@reduxjs/toolkit/query"
import Button from "react-bootstrap/Button"

type ButtonType = "submit" | "reset" | "button"

type ProgressButtonProps = {
  type: ButtonType
  color: string
  text: string
  status: QueryStatus
}

export default function ProgressButton(props: ProgressButtonProps) {
  const { type, color, status, text } = props
  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const value = status === QueryStatus.pending
    setLoading(value)
    setDisabled(value)
  }, [status])

  return (
    <Button variant={color} type={type} disabled={disabled} className="w-100 mb-3 btn-lg">
      {loading ? <span className="spinner-border spinner-border-sm"></span> : text}
    </Button>
  )
}
