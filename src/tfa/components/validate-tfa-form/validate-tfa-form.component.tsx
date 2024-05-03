import { FieldError } from "react-hook-form";
import IconInput from "../../../common/components/icon-input/icon-input.component";
import SubmitButton from "../../../common/components/submit-button/submit-button";
import useValidateTfaHandler from "../../hooks/validate-tfa-handler.hook";

/**
 * Renders the Validate TFA Form component.
 * @author Yonatan A Quintero R
 * @returns {JSX.Element} The Validate TFA Form component.
 */
export default function ValidateTfaForm() {

  const { onSubmit, zodForm, isLoading, tfaUsername, t } = useValidateTfaHandler();
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
          readOnly={true}
          register={register}
          error={errors.username as FieldError}
          value={tfaUsername}
        />

        <IconInput
          type="text"
          name="code"
          label={t("validate-code.label")}
          placeholder={t("validate-code.placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.code as FieldError}
          autoFocus={true}
          disabled={isLoading}
        />

        <div className="input-group mb-3">
          <SubmitButton disabled={isLoading} />
        </div>
      </form>
    </>
  );
}
