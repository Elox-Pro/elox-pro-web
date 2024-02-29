import { useState } from "react"
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"
import useActiveUser from "../../../auth/hooks/active-user.hook"
import "./dropwdown-profile.style.scss"

export default function DropdownProfile() {
  const activeUser = useActiveUser()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const toggle = () => setDropdownOpen((prevState) => !prevState)

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle} className="dropdown-profile">
      <DropdownToggle caret size="lg" type="button" title="profile">
        <i className="bi bi-person-circle"></i>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>{activeUser?.sub}</DropdownItem>
        <DropdownItem>Action</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}
