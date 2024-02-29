import { Container } from "reactstrap"
import "./cover-index.styles.scss"
import CoverHeader from "../header/cover-header.component"
import CoverMain from "../main/cover-main.component"
import CoverFooter from "../footer/cover-footer.component"

export default function CoverIndex() {
  return (
    <div className="cover-index d-flex h-100 text-center bd-masthead">
      <Container fluid className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
        <CoverHeader />
        <CoverMain />
        <CoverFooter />
      </Container>
    </div>
  )
}
