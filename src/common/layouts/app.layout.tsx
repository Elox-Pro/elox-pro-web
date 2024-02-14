import { Outlet } from "react-router-dom"
export default function AppLayout() {
  return (
    <div>
      <nav>Navbar</nav>
      <Outlet />
      <footer>Footer</footer>
    </div>
  )
}
