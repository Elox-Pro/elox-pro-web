import Nav from "react-bootstrap/Nav"
import useRedirectTimeout from "../../common/hooks/redirect-timeout.hook"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

type ErrorPros = {
  code: number
  message: string
}
export default function ErrorPage({ code, message }: ErrorPros) {
  const { t } = useTranslation(["error-page", "nav"])
  const seconds = 10
  const { isRedirecting } = useRedirectTimeout({
    delayInSeconds: seconds,
    page: "/auth",
  })
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light text-dark">
      <div className="d-block text-center">
        <h1 className="display-1 fw-bold">{code}</h1>
        <h4>{message}</h4>
        {isRedirecting && (
          <p>
            <small>{t("error-page:redirecting_in", { seconds })}</small>
          </p>
        )}
        <ul className="nav justify-content-center">
          <li className="nav-item">
            <Nav className="ms-auto">
              <Link to={"/"} replace={true} className="nav-link">
                {t("nav:home")}
              </Link>
            </Nav>
          </li>
          <li>
            <Nav className="ms-auto">
              <Link to={"/auth"} replace={true} className="nav-link">
                {t("nav:login")}
              </Link>
            </Nav>
          </li>
        </ul>
      </div>
    </div>
  )
}
