import { useGetProfileQuery } from "../../api/profile.api"
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/esm/Col"
import ProfileBasicInfo from "../basic-info/profile-basic-info.component"
import ProfileContactInfo from "../contact-info/profile-contact-info.component"
import ProfilePasswordInfo from "../password-info/profile-password-info.component"
import ProfileTfaInfo from "../tfa-info/profile-tfa-info.component"
import ProfileSettings from "../settings/profile-settings.component"

export default function ProfileIndex() {

  const { data, error, isLoading, status } = useGetProfileQuery()
  const user = data?.user

  return (
    <CPWrapperPage loading={isLoading} error={error} status={status}>
      {user &&
        <div className="profile-index">
          <Row className="text-center">
            <Col xs={12}>
              <p className="fs-1 mb-0">Personal info</p>
              <p>Info about you and your preferences.</p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <ProfileBasicInfo user={user} />
            </Col>
            <Col xs={12}>
              <ProfileContactInfo user={user} />
            </Col>
            <Col xs={12}>
              <ProfilePasswordInfo user={user} />
            </Col>
            <Col xs={12}>
              <ProfileTfaInfo user={user} />
            </Col>
            <Col xs={12}>
              <ProfileSettings user={user} />
            </Col>
          </Row>

        </div>
      }
    </CPWrapperPage>
  )
}
