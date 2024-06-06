import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import { ZodType } from "zod"

export function useZodForm<T extends FieldValues>(type: ZodType) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, },
  } = useForm<T>({
    resolver: zodResolver(type),
  })

  return {
    register,
    handleSubmit,
    reset,
    errors,
    watch
  }
}
