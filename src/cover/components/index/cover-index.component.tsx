import Container from "react-bootstrap/Container"
import "./cover-index.styles.scss"
import CoverHeader from "../header/cover-header.component"
import CoverMain from "../main/cover-main.component"
import CoverFooter from "../footer/cover-footer.component"

export default function CoverIndex() {
  return (
    <section className="cover-index cover-bg">
      <Container fluid>
        <CoverHeader />
        <CoverMain />
        <CoverFooter />
      </Container>
    </section>
  )
}
