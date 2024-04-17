import { useEffect, useState } from "react"
import { showGRecaptcha } from "../helpers/show-grecaptcha.helper"
import { GOOGLE_RECAPTCHA_SITE_KEY } from "../../app/constants/app.constants"

type GoogleRecaptcha = {
  execute(sitekey: string, action: object): Promise<string>
}

export function useGRecaptcha(): GoogleRecaptcha | null {
  const [grecaptchaInstance, setGrecaptchaInstance] = useState<GoogleRecaptcha | null>(null)
  const siteKey = GOOGLE_RECAPTCHA_SITE_KEY
  useEffect(() => {
    const asyncScriptUrl = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    const script = document.createElement("script")
    script.src = asyncScriptUrl
    script.async = true
    document.body.appendChild(script)

    const intervalId = setInterval(() => {
      if ((window as any).grecaptcha) {
        clearInterval(intervalId)
        setGrecaptchaInstance((window as any).grecaptcha)
        showGRecaptcha(true)
      }
    }, 100)

    return () => {
      document.body.removeChild(script)
      clearInterval(intervalId)
    }
  }, [])

  return grecaptchaInstance
}

export async function getGRecaptchaToken(grecaptcha: GoogleRecaptcha | null): Promise<string> {

  if (!grecaptcha) {
    throw new Error("Recaptcha is required")
  }
  const token = await grecaptcha.execute(GOOGLE_RECAPTCHA_SITE_KEY, { action: "submit" })
  if (!token) {
    throw new Error("Token is required")
  }
  return token;
}
