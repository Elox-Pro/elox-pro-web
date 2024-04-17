import { FieldError } from "react-hook-form"
import { QueryStatus } from "@reduxjs/toolkit/query"
import { loginSchema } from "../../schemas/login.schema"
import { LoginRequest } from "../../types/login/login-request.type"
import Input from "../../../common/components/input/input.component"
import { useLoginRequestMutation } from "../../api/auth.api"
import AlertError from "../../../common/components/alert-error/alert-error.component"
import ProgressButton from "../../../common/components/progress-button/progress-button.component"
import { useAuth } from "../../providers/auth.provider"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useZod } from "../../../common/hooks/zod.hook"
import { useAppDispatch, useAppSelector } from "../../../app/hooks/app.hooks"
import { setSignupSuccess } from "../../feautures/auth.slice"
import { setUsername, setTfaPending } from "../../../tfa/features/tfa.slice"
import { GOOGLE_RECAPTCHA_SITE_KEY } from "../../../app/constants/app.constants"
import { useGRecaptcha } from "../../../common/hooks/grecaptcha.hook"
import AuthLink from "../auth-link/auth-link.component"
import { setOverlay } from "../../../common/features/common.slice"

import { ToastContainer, toast } from 'react-toastify';
import { handleError } from "../../../common/helpers/handle-error.helper"
import Button from "react-bootstrap/esm/Button"

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["common", "auth"])
  const { register, handleSubmit, errors } = useZod<LoginRequest>(loginSchema)
  const authContext = useAuth()
  const navigate = useNavigate()
  const { createSession } = authContext
  const [loginRequest, { data, status, error }] = useLoginRequestMutation()
  const grecaptcha = useGRecaptcha(GOOGLE_RECAPTCHA_SITE_KEY)
  const { username } = useAppSelector((state) => state.tfa)
  const [disabledField, setDisabledField] = useState(false)

  //TODO: Possible use in other file like a helper
  const getTokenRecaptcha = async (): Promise<string> => {
    try {
      if (!grecaptcha) {
        throw new Error(t("auth:recaptcha_error"))
      }
      const token = await grecaptcha.execute(GOOGLE_RECAPTCHA_SITE_KEY, { action: "submit" })
      if (!token) {
        throw new Error(t("auth:recaptcha_error"))
      }
      return token;
    } catch (error) {
      throw error;
    }
  }

  const onInitRequest = (username: string) => {
    dispatch(setOverlay(true))
    dispatch(setUsername(username))
    setDisabledField(true)
  }

  const onErrorRequest = (error: any) => {
    dispatch(setOverlay(false))
    dispatch(setUsername(""))
    setDisabledField(false)
    toast.error("Error submitting login request")
    console.error("Login Error:", error)
  }

  const onRejected = () => {
    dispatch(setOverlay(false))
    dispatch(setUsername(""))
    setDisabledField(false)
    const res = handleError(error)
    if (res.code === 401) {
      navigate("/error/401", { replace: true })
    } else {
      toast.error(res.message)
    }
    console.error("Login Rejected:", res)
  }

  const onFulfilled = () => {
    dispatch(setOverlay(false))
    // dispatch(setSignupSuccess(false))
    if (data) {
      if (data.isTFAPending) {
        dispatch(setTfaPending(true))
        navigate("/tfa/validate", { replace: true })
      } else {
        createSession();
        dispatch(setTfaPending(false))
        dispatch(setUsername(""))
        navigate("/cpanel/dashboard", { replace: true })
      }
    }
  }

  const onSubmit = async (req: LoginRequest) => {
    try {
      // dispatch(setOverlay(true))
      // if (!grecaptcha) {
      //   throw new Error(t("auth:recaptcha_error"))
      // }
      // const token = await grecaptcha.execute(GOOGLE_RECAPTCHA_SITE_KEY, { action: "submit" })
      // if (!token) {
      //   throw new Error(t("auth:recaptcha_error"))
      // }
      // dispatch(setUsername(request.username))
      onInitRequest(req.username)
      const grecaptchaToken = await getTokenRecaptcha()
      loginRequest({ ...req, grecaptchaToken })
    } catch (error) {
      onErrorRequest(error)
    }
  }

  useEffect(() => {
    switch (status) {
      case QueryStatus.rejected:
        onRejected()
        break
      case QueryStatus.fulfilled:
        onFulfilled()
        break
    }
  }, [status])

  // useEffect(() => {

  //   if (status !== QueryStatus.pending) {
  //     dispatch(setOverlay(false))
  //   }

  //   if (status === QueryStatus.fulfilled) {
  //     dispatch(setSignupSuccess(false))
  //     if (data?.isTFAPending) {
  //       dispatch(setTfaPending(true))
  //       navigate("/tfa/validate", { replace: true })
  //     } else {
  //       dispatch(setTfaPending(false))
  //       dispatch(setUsername(""))
  //       createSession()
  //       navigate("/cpanel/dashboard", { replace: true })
  //     }
  //   }
  // }, [status])

  return (
    <>
      {/* <AlertError status={status} error={error} /> */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="row g-3">
        <Input
          type="text"
          name="username"
          label={t("auth:username_label")}
          placeholder={t("auth:username_placeholder")}
          icon="bi bi-person"
          register={register}
          defaultValue={username}
          error={errors.username as FieldError}
          autofocus={true}
          disabled={disabledField}
        />

        <Input
          type="password"
          name="password"
          label={t("auth:password_label")}
          placeholder={t("auth:password_placeholder")}
          icon="bi bi-lock"
          register={register}
          error={errors.password as FieldError}
          disabled={disabledField}
        />

        <div className="input-group mb-3">
          <Button type="submit" variant="primary" disabled={disabledField} className="w-100 mb-3 btn-lg">
            {t("common:submit")}
          </Button>
          {/* <ProgressButton type="submit" color="primary" status={status} text={t("common:submit")} /> */}
        </div>
      </form>

      <p className="text-end">
        <AuthLink text={t("auth:forgot_password")} to={"/recover-password/init"} />
      </p>
    </>
  )
}