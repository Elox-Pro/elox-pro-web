import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks";
import { RecoverPasswordInitRequest } from "../../types/recover-password-init/recover-password-init-request.type";
import { recoverPasswordInitSchema } from "../../schemas/recover-password-init.schema";
import { useZodForm } from "../../../common/hooks/zod-form.hook";
import { useNavigate } from "react-router-dom";
import { useInitMutation } from "../../api/recover-password.api";
import { getGRecaptchaToken, useGRecaptcha } from "../../../common/hooks/grecaptcha.hook";
import { useEffect } from "react";
import { QueryStatus } from "@reduxjs/toolkit/query";
import IconInput from "../../../common/components/icon-input/icon-input.component";
import { FieldError } from "react-hook-form";
import { setTfaPending, setTfaUsername } from "../../../tfa/features/tfa.slice";
import { toast } from "react-toastify";
import SubmitButton from "../../../common/components/submit-button/submit-button";
import { setOverlay } from "../../../common/features/common.slice";

/**
 * Renders the Recover Password Init Form component.
 * @author Yonatan A Quintero R
 * @returns {JSX.Element} The Recover Password Init Form component.
 */
export default function RecoverPasswordInitForm() {
  const { t } = useTranslation("recover-password", { keyPrefix: "init" })
  const dispatch = useAppDispatch();
  const { register, handleSubmit, errors } = useZodForm<RecoverPasswordInitRequest>(recoverPasswordInitSchema);
  const navigate = useNavigate();
  const {overlay} = useAppSelector((state) => state.common);
  const [mutation, { status }] = useInitMutation();
  const grecaptcha = useGRecaptcha();

  /**
   * Handles the form submission.
   * @param {RecoverPasswordInitRequest} req - The recover password init request object.
   * @returns {Promise<void>} - A Promise that resolves when the request is complete.
   */
  const onSubmit = async (req: RecoverPasswordInitRequest) => {
    try {
      dispatch(setOverlay(true));
      dispatch(setTfaUsername(req.username));
      const grecaptchaToken = await getGRecaptchaToken(grecaptcha);
      mutation({ ...req, grecaptchaToken });
    } catch (error) {
      console.error(error);
      toast.error(JSON.stringify(error));
    }
  };

  useEffect(() => {
    if (status === QueryStatus.fulfilled) {
      dispatch(setTfaPending(true));
      navigate("/tfa/validate", { replace: true });
    }
  }, [status]);


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="row g-3">
        <IconInput
          type="text"
          name="username"
          label={t("username.label")}
          placeholder={t("username.placeholder")}
          icon="bi bi-person"
          register={register}
          error={errors.username as FieldError}
          autoFocus={true}
          disabled={overlay.active}
          autoComplete="username"
        />
        <div className="input-group mb-3">
          <SubmitButton disabled={overlay.active} />
        </div>
      </form>
    </>
  );
}