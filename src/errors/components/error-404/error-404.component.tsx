import useRedirectTimeout from "../../../common/hooks/redirect-timeout.hook"

export default function Error404() {
  const seconds = 10
  const { isRedirecting } = useRedirectTimeout({
    delayInSeconds: seconds,
    page: "/auth",
  })

  return (
    <>
      <h1>Página no encontrada - Error 404</h1>
      {isRedirecting && (
        <p>
          <small>Redireccionando en {seconds} segundos...</small>
        </p>
      )}
    </>
  )
}
