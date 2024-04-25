import { useTranslation } from "react-i18next"
import { useAppSelector } from "../../../app/hooks/app.hooks"
import AuthFormHeader from "../../../auth/components/auth-form-header/auth-form-header.component"
import ValidateTfaForm from "../validate-tfa-form/validate-tfa-form.component"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { WebSocketService } from "../../../common/services/web-socket.service"

export default function VaildateTfa() {
  const { t } = useTranslation("tfa", { keyPrefix: "validate-tfa" })
  const { tfaPending, tfaUsername } = useAppSelector((state) => state.tfa)
  const navigate = useNavigate()

  useEffect(() => {
    if (!tfaPending) {
      navigate(-1)
    }
  }, [])


  useEffect(() => {
    console.log("ComponentDidMount",tfaUsername)
    const webSocketService = new WebSocketService(tfaUsername)
    const onJobSent = (message: string) => {

      console.log(message);
      // Display a notification or update the UI
    };

    const onJobFailed = (message: string) => {
      console.log(message);
      // Display a notification or update the UI
    };

    const onJobSucceeded = (message: string) => {
      console.log(message);
      // Display a notification or update the UI
    };

    webSocketService.subscribeToJobEvents(onJobSent, onJobFailed, onJobSucceeded);

    return () => {
      webSocketService.unsubscribeFromJobEvents();
      webSocketService.disconnect();
    };
  }, []);

  return (
    <>
      {tfaPending && (
        <>
          <AuthFormHeader title={t("title")} description={t("description")} />
          <ValidateTfaForm />
        </>
      )}
    </>
  )
}
