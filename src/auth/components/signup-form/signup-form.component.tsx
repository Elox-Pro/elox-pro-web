import { FieldError } from "react-hook-form";
import IconInput from "../../../common/components/icon-input/icon-input.component";
import SubmitButton from "../../../common/components/submit-button/submit-button";
import useSignupHandler from "../../hooks/signup-handler.hook";

/**
 * Renders the Signup Form component.
 * @returns {JSX.Element} The Signup Form component.
 */
export default function SignupForm() {

  const { onSubmit, overlay, zodForm, t } = useSignupHandler();
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
          error={errors.username as FieldError}
          autoFocus={true}
          disabled={overlay.active}
          autoComplete="username"
        />

        <IconInput
          type="email"
          name="email"
          label={t("email.label")}
          placeholder={t("email.placeholder")}
          icon="bi bi-envelope"
          register={register}
          error={errors.email as FieldError}
          disabled={overlay.active}
        />

        <IconInput
          type="password"
          name="password1"
          label={t("password.label")}
          placeholder={t("password.placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password1 as FieldError}
          disabled={overlay.active}
          autoComplete="new-password"
        />

        <IconInput
          type="password"
          name="password2"
          label={t("confirm-password.label")}
          placeholder={t("confirm-password.placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password2 as FieldError}
          disabled={overlay.active}
          autoComplete="new-password"
        />

        <div className="input-group mb-3">
          <SubmitButton disabled={overlay.active} />
        </div>
      </form>
    </>
  );
}