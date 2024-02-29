import { Link } from "react-router-dom"
import "./brand-link.style.scss"

type BrandLinkProps = {
  to: string
  isText: boolean
}

export default function BrandLink({ to, isText }: BrandLinkProps) {
  return (
    <Link to={to} className="brand-link text-white">
      <img src="/icons/logo-white-520.png" alt="Elox Pro Logo" width="40" height="40" className="bi pe-none me-2" />
      {isText && <span>Elox Pro</span>}
    </Link>
  )
}
