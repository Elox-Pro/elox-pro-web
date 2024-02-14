import { Outlet } from "react-router-dom"
export default function DashboardLayout() {
  return (
    <>
      <nav>Navbar</nav>
      <Outlet />
      <footer>Footer</footer>
    </>
  )
}
