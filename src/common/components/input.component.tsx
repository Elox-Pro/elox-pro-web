import { FieldError, UseFormRegister } from "react-hook-form"

export type InputProps = {
  type: string
  name: string
  label: string
  placeholder: string
  id: string
  icon?: string
  autofocus?: boolean
  register: UseFormRegister<any>
  error: FieldError | undefined
  valueAsNumber?: boolean
}

const Input = (props: InputProps) => {
  const { id, icon, type, placeholder, name, label, autofocus, register, error, valueAsNumber } = props
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
            required
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

export default Input
