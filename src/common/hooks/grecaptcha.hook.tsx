import { useEffect, useState } from "react"
import { showGRecaptcha } from "../helpers/show-grecaptcha.helper"

type GoogleRecaptcha = {
  execute(sitekey: string, action: object): Promise<string>
}

export const useGRecaptcha = (siteKey: string): GoogleRecaptcha | null => {
  const [grecaptchaInstance, setGrecaptchaInstance] = useState<GoogleRecaptcha | null>(null)

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
  }, [siteKey])

  return grecaptchaInstance
}
