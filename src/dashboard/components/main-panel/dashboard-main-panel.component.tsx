import { ReactNode } from "react"
import "./dashboard-main-panel.style.scss"

type DashboardMainPanelProps = {
  children: ReactNode
}
export default function DashboardMainPanel({ children }: DashboardMainPanelProps) {
  return <main className="dashboard-main-panel">{children}</main>
}
