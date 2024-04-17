import { InputHTMLAttributes, useId } from "react"
import { FieldError, UseFormRegister } from "react-hook-form"
import { useTranslation } from "react-i18next"

type IconInputProps = {
  icon?: string
  label: string
  register: UseFormRegister<any>
  error: FieldError | undefined
  valueAsNumber?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export default function IconInput({ icon, label, register, error, valueAsNumber, ...props }: IconInputProps) {

  const { name } = props;
  if (!name) {
    throw new Error("Name is required");
  }

  const { t } = useTranslation(["zod-error"])
  const id = useId()
  const formControlClass = `form-control ${error ? "is-invalid" : ""}`
  const feedbackClass = `invalid-feedback ${error ? "d-block" : "d-none"}`
  const errorMessage = error && t(error.message || "")

  return (
    <>
      <div className="input-group has-validation mb-3">
        {icon && (
          <span className="input-group-text bg-transparent">
            <i className={icon}></i>
          </span>
        )}

        <div className="form-floating">
          <input
            className={formControlClass}
            id={id}
            {...register(name, { valueAsNumber })}
            {...props}
          />
          <label htmlFor={id}>{label}</label>
        </div>
        <div className={feedbackClass}>{errorMessage}</div>
      </div>
    </>
  )
}
