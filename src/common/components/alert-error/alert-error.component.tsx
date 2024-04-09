import { useEffect, useState } from "react"
import Alert from "react-bootstrap/Alert"
import { ErrorData, useHandleError } from "../../helpers/handle-error.helper"
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query"
import { SerializedError } from "@reduxjs/toolkit"

export type AlertErrorPros = {
  status: QueryStatus
  error: FetchBaseQueryError | SerializedError | undefined
}

export default function AlertError({ status, error }: AlertErrorPros) {
  const [show, setShow] = useState(false)
  const [errorData, setErrorData] = useState<ErrorData>()

  useEffect(() => {
    if (status === QueryStatus.rejected) {
      const { data } = useHandleError(error)
      setShow(data !== undefined)
      setErrorData(data)
    } else if (status === QueryStatus.fulfilled) {
      setShow(false)
    }
  }, [status, error])

  return (
    <Alert show={show} variant="danger" onClose={() => setShow(false)} dismissible>
      <h4 className="alert-heading">
        <i className="bi bi-exclamation-circle me-3"></i>
        {errorData?.error}&nbsp;{errorData?.statusCode}
      </h4>
      <p>{errorData?.message}</p>
    </Alert>
  )
}
