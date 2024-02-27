import useRedirectTimeout from "../../../common/hooks/redirect-timeout.hook"

export default function Error401() {
  const seconds = 10
  const { isRedirecting } = useRedirectTimeout({
    delayInSeconds: seconds,
    page: "/auth",
  })

  return (
    <>
      <h1>No autorizado - Error 401</h1>
      {isRedirecting && (
        <p>
          <small>Redireccionando en {seconds} segundos...</small>
        </p>
      )}
    </>
  )
}
