import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, useForm } from "react-hook-form"
import { ZodType } from "zod"

export function useZod<T extends FieldValues>(type: ZodType) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: zodResolver(type),
  })

  return {
    register,
    handleSubmit,
    errors,
  }
}
