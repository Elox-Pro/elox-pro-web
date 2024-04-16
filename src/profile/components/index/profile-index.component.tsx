import { useGetProfileQuery } from "../../api/profile.api"
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/esm/Col"
import ProfileBasicInfo from "../basic-info/profile-basic-info.component"
import ProfileContactInfo from "../contact-info/profile-contact-info.component"
import ProfilePasswordInfo from "../password-info/profile-password-info.component"
import ProfileTfaInfo from "../tfa-info/profile-tfa-info.component"
import ProfileSettings from "../settings/profile-settings.component"
import { useTranslation } from "react-i18next"
import ProfileToast from "../profile-toast/profile-toast.component"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { setProfile, setProfileT } from "../../features/profile.slice"
import { useAppSelector } from "../../../app/hooks/app.hooks"

export default function ProfileIndex() {
  const { t } = useTranslation("profile", { keyPrefix: "index" });
  const dispatch = useDispatch();
  const { profile, profileT } = useAppSelector((state) => state.profile);
  const { data, error, isLoading, status } = useGetProfileQuery();

  useEffect(() => {
    if (Object.keys(profile).length === 0 || Object.keys(profileT).length === 0) {
      if (status === QueryStatus.fulfilled && data) {
        dispatch(setProfile(data.user));
        dispatch(setProfileT(data.userTranslations));
      }
    }
  }, [dispatch, profile, profileT, status, data]);

  return (
    <CPWrapperPage loading={isLoading} error={error} status={status}>
      {status === QueryStatus.fulfilled &&
        <div className="profile-index">
          <ProfileToast />
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
      }
    </CPWrapperPage>
  )
}
