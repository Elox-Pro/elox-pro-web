import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/esm/Col"
import ProfileBasicInfo from "../basic-info/profile-basic-info.component"
import ProfileContactInfo from "../contact-info/profile-contact-info.component"
import ProfilePasswordInfo from "../password-info/profile-password-info.component"
import ProfileTfaInfo from "../tfa-info/profile-tfa-info.component"
import ProfileSettings from "../settings/profile-settings.component"
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component"
import { useGetProfile } from "../../hooks/get-profile-handler.hook"

export default function ProfileIndex() {

  const { isSuccess, profile, t } = useGetProfile();

  return (
    <CPWrapperPage show={isSuccess && profile !== null} >
      <div className="profile-index">
        <Row className="text-center">
          <Col xs={12}>
            <p className="fs-1 mb-0">{t("title")}</p>
            <p>{t("subtitle")}</p>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ProfileBasicInfo />
          </Col>
          <Col xs={12}>
            <ProfileContactInfo />
          </Col>
          <Col xs={12}>
            <ProfilePasswordInfo />
          </Col>
          <Col xs={12}>
            <ProfileTfaInfo />
          </Col>
          <Col xs={12}>
            <ProfileSettings />
          </Col>
        </Row>
      </div>
    </CPWrapperPage>
  )
}