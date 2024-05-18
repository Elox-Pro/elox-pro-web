import { FieldError } from "react-hook-form";
import IconInput from "../../../common/components/icon-input/icon-input.component";
import AuthLink from "../auth-link/auth-link.component";
import SubmitButton from "../../../common/components/submit-button/submit-button";
import useLoginHandler from "../../hooks/login-handler.hook";

/**
 * LoginForm component
 * @author Yonatan A Quintero R
 * @returns {JSX.Element} - The login form
 */
export default function LoginForm() {
  const { onSubmit, tfaUsername, overlay, zodForm, t } = useLoginHandler();
  const { register, handleSubmit, errors } = zodForm;

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
          defaultValue={tfaUsername}
          error={errors.username as FieldError}
          autoFocus={true}
          disabled={overlay.active}
          autoComplete="username"
        />

        <IconInput
          type="password"
          name="password"
          label={t("password.label")}
          placeholder={t("password.placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password as FieldError}
          disabled={overlay.active}
          autoComplete="current-password"
        />

        <div className="input-group mb-3">
          <SubmitButton disabled={overlay.active} />
        </div>
      </form>

      <p className="text-end">
        <AuthLink text={t("forgot-password")} to={"/recover-password/init"} />
      </p>
    </>
  );
}