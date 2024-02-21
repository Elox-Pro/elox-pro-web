import { useEffect, useState } from "react"
import { Alert } from "reactstrap"
import { ErrorData, useHandleError } from "../../helpers/handle-error.helper"
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query"
import { SerializedError } from "@reduxjs/toolkit"

type AlertErrorPros = {
  status: QueryStatus
  error: FetchBaseQueryError | SerializedError | undefined
}

export default function AlertError({ status, error }: AlertErrorPros) {
  const [visible, setVisible] = useState(false)
  const onDismiss = () => setVisible(false)
  const [errorData, setErrorData] = useState<ErrorData>()

  useEffect(() => {
    if (status === QueryStatus.rejected) {
      const { data } = useHandleError(error)
      setVisible(data !== undefined)
      setErrorData(data)
    } else if (status === QueryStatus.fulfilled) {
      setVisible(false)
    }
  }, [status, error])

  return (
    <Alert color="danger" isOpen={visible} toggle={onDismiss}>
      <h4 className="alert-heading">
        <i className="bi bi-exclamation-circle me-3"></i>
        {errorData?.error}&nbsp;{errorData?.statusCode}
      </h4>
      <p>{errorData?.message}</p>
    </Alert>
  )
}
