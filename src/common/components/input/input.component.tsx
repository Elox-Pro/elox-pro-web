import { useId } from "react"
import { FieldError, UseFormRegister } from "react-hook-form"

export type InputProps = {
  type: string
  name: string
  label: string
  placeholder: string
  icon?: string
  autofocus?: boolean
  register: UseFormRegister<any>
  error: FieldError | undefined
  valueAsNumber?: boolean
}

export default function Input({
  icon,
  type,
  placeholder,
  name,
  label,
  autofocus,
  register,
  error,
  valueAsNumber,
}: InputProps) {
  const id = useId()
  const formControlClass = `form-control ${error ? "is-invalid" : ""}`
  const feedbackClass = `invalid-feedback ${error ? "d-block" : "d-none"}`
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
            type={type}
            className={formControlClass}
            id={id}
            placeholder={placeholder}
            autoFocus={autofocus}
            {...register(name, { valueAsNumber })}
          />
          <label htmlFor={id}>{label}</label>
        </div>
        <div className={feedbackClass}>{error?.message}</div>
      </div>
    </>
  )
}
