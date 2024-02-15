import { NavLink } from "react-router-dom"

export default function AuthNav() {
  return (
    <nav>
      <NavLink to="/auth/">Iniciar sesión</NavLink>
      <br />
      <NavLink to="/auth/signup">Crear cuenta</NavLink>
    </nav>
  )
}
