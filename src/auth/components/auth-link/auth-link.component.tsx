import { Link } from "react-router-dom"

type AuthLinkProps = {
  text: string
  to: string
}
export default function AuthLink({ text, to }: AuthLinkProps) {
  return (
    <Link className="fw-semibold mt-2 ms-2" to={to}>
      {text}
    </Link>
  )
}
