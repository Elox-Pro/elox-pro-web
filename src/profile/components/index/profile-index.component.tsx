import { useGetProfileQuery } from "../../api/profile.api"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/esm/Col"
import ProfileBasicInfo from "../basic-info/profile-basic-info.component"
import ProfileContactInfo from "../contact-info/profile-contact-info.component"
import ProfilePasswordInfo from "../password-info/profile-password-info.component"
import ProfileTfaInfo from "../tfa-info/profile-tfa-info.component"
import ProfileSettings from "../settings/profile-settings.component"
import { useTranslation } from "react-i18next"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { setProfile, setProfileTranslations } from "../../features/profile.slice"
import { setOverlay } from "../../../common/features/common.slice"
import { Navigate, useNavigate } from "react-router-dom"
import CPWrapperPage from "../../../cpanel/components/wrapper-page/cp-wrapper-page.component"
import { handleRejected } from "../../../common/helpers/handle-rejected.helper"
import { useAppSelector } from "../../../app/hooks/app.hooks"
import CPGuard from "../../../cpanel/guards/cp.guard."
import { useActiveUser } from "../../../auth/hooks/active-user.hook"

export default function ProfileIndex() {
  const { profile } = useAppSelector(state => state.profile);
  const { t } = useTranslation("profile", { keyPrefix: "index" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const activeUser = useActiveUser();
  // if (activeUser === null || !activeUser.isAuthenticated) {
  //   console.log(1, "validate active user", activeUser)
  //   return <Navigate to="/error/401/" replace />;
  // }


  const { data, error, status, isSuccess, refetch } = useGetProfileQuery();

  useEffect(() => {
    console.log(3, "profile", profile)
    if (profile === null && !data) {
      refetch();
    }

    switch (status) {
      case QueryStatus.pending: onInitRequest(); break;
      case QueryStatus.rejected: onRejected(); break;
      case QueryStatus.fulfilled: onFulfilled(); break;
    }
  }, [status, data, error]);

  const onInitRequest = () => {
    dispatch(setOverlay(true));
  }

  const onRejected = () => {
    dispatch(setOverlay(false));
    handleRejected({ error, message: "Profile Rejected", navigate });
  }

  const onFulfilled = () => {
    dispatch(setOverlay(false));
    if (!data) { return; }
    dispatch(setProfile(data.user));
    dispatch(setProfileTranslations(data.userTranslations));
  }

  return (
    isSuccess &&
    <CPWrapperPage >
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
    </CPWrapperPage >
  );
}