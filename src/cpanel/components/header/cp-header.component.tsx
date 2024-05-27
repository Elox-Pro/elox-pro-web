import CPNavbar from "../navbar/cp-navbar.component"
import "./cp-header.style.scss";

export default function CPHeader() {
  return (
    <header className="cp-header sticky-top">
      <CPNavbar />
    </header>
  )
}
