import { FieldError } from "react-hook-form";
import { loginSchema } from "../../schemas/login.schema";
import { LoginRequest } from "../../types/login/login-request.type";
import IconInput from "../../../common/components/icon-input/icon-input.component";
import { useTranslation } from "react-i18next";
import { useZod } from "../../../common/hooks/zod.hook";
import AuthLink from "../auth-link/auth-link.component";
import SubmitButton from "../../../common/components/submit-button/submit-button";
import useLoginMutation from "../../hooks/login-mutation.hook";

/**
 * LoginForm component
 * @author Yonatan A Quintero R
 * @returns {JSX.Element} - The login form
 */
export default function LoginForm() {
  const { t } = useTranslation("auth", { keyPrefix: "login" });// TODO: move use login mutation
  const { register, handleSubmit, errors } = useZod<LoginRequest>(loginSchema); // TODO: move use login mutation
  const { onSubmit, tfaUsername, isLoading } = useLoginMutation();

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
          disabled={isLoading}
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
          disabled={isLoading}
          autoComplete="current-password"
        />

        <div className="input-group mb-3">
          <SubmitButton disabled={isLoading} />
        </div>
      </form>

      <p className="text-end">
        <AuthLink text={t("forgot-password")} to={"/recover-password/init"} />
      </p>
    </>
  );
}