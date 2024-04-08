import { ReactNode } from "react"
import "./cp-main.style.scss"

type DashboardMainPanelProps = {
  children: ReactNode
}
export default function CPMain({ children }: DashboardMainPanelProps) {
  return <main className="cp-main">{children}</main>
}
