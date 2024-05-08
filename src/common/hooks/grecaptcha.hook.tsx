import { useEffect, useState } from "react"
import { showGRecaptcha } from "../helpers/show-grecaptcha.helper"
import { GOOGLE_RECAPTCHA_SITE_KEY } from "../../app/constants/app.constants"

const ID = "grecaptcha-async-script"

type GoogleRecaptcha = {
  execute(sitekey: string, action: object): Promise<string>
}

export function useGRecaptcha(): GoogleRecaptcha | null {
  const [grecaptchaInstance, setGrecaptchaInstance] = useState<GoogleRecaptcha | null>(null)
  const siteKey = GOOGLE_RECAPTCHA_SITE_KEY
  useEffect(() => {
    const element = document.getElementById(ID)
    if (!element) {
      const asyncScriptUrl = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
      const script = document.createElement("script")
      script.src = asyncScriptUrl
      script.async = true
      script.id = ID
      document.body.appendChild(script)
    }

    const intervalId = setInterval(() => {
      if ((window as any).grecaptcha) {
        clearInterval(intervalId)
        setGrecaptchaInstance((window as any).grecaptcha)
        showGRecaptcha(true)
      }
    }, 100)

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
