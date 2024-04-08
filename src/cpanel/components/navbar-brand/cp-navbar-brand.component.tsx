import { Link } from "react-router-dom"
import "./cp-navbar-brand.style.scss"

export enum CPNavbarBrandLogo {
  COLOR = "/icons/logo-color-520.png",
  WHITE = "/icons/logo-white-520.png",
}

type CPNavbarBrandProps = {
  logo: CPNavbarBrandLogo
  size: number
  text: string
}

export default function CPNavbarBrand({ logo, size, text }: CPNavbarBrandProps) {
  return (
    <Link to="dashboard" className="cp-navbar-brand">
      <img src={logo} alt="Elox Pro Logo" width={size} height={size} />
      <span className="cp-navbar-brand-text ms-2">{text}</span>
    </Link>
  )
}
