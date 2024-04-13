import { useEffect, useState } from "react"
import Alert from "react-bootstrap/Alert"
import { ErrorData, useHandleError } from "../../helpers/handle-error.helper"
import { FetchBaseQueryError, QueryStatus } from "@reduxjs/toolkit/query"
import { SerializedError } from "@reduxjs/toolkit"
import { useNavigate } from "react-router-dom"

export type AlertErrorPros = {
  status: QueryStatus | undefined
  error: FetchBaseQueryError | SerializedError | undefined
}

export default function AlertError({ status, error }: AlertErrorPros) {

  const navigate = useNavigate();
  const [show, setShow] = useState(false)
  const [errorData, setErrorData] = useState<ErrorData>()

  useEffect(() => {
    if (status === QueryStatus.rejected) {
      const { data } = useHandleError(error)
      if (data.statusCode === 401) {
        navigate("/error/401", { replace: true })
      } else {
        setShow(true)
        setErrorData(data)
      }
    } else if (status === QueryStatus.fulfilled) {
      setShow(false)
    }
  }, [status, error]);

  const handleClose = () => {
    setShow(false);
  }

  return (
    <Alert show={show} variant="danger" onClose={handleClose} dismissible>
      <h4 className="alert-heading">
        <i className="bi bi-exclamation-circle me-3"></i>
        {errorData?.error}&nbsp;{errorData?.statusCode}
      </h4>
      <p>{errorData?.message}</p>
    </Alert>
  )
}
