type AuthLinkProps = {
  text: string
  onClick?: () => void
}
export default function AuthLink({ text, onClick }: AuthLinkProps) {
  return (
    <a className="fw-semibold mt-2 ms-2" href="#" onClick={onClick}>
      <small>{text}</small>
    </a>
  )
}
