import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"
import { User } from "../../types/user.type"
import { LoginFormTokens } from "../login/login-form-tokens.type"
import { jwtDecode } from "jwt-decode"
import Cookies from "js-cookie"

const ACCESS_TOKEN_KEY = "elox-pro-session-id-0"
const REFRESH_TOKEN_KEY = "elox-pro-session-id-1"
const REFRESH_TOKEN_TTL_KEY = "elox-pro-session-id-2"

type AuthContextProps = {
  user: User | null
  setLogin: (tokens: LoginFormTokens) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | null>(null)

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  // const tokenStore: TokenStore = new TokenLocalStorage()
  const tokenStore: TokenStore = new TokenCookieStorage()
  useEffect(() => {
    const accessToken = tokenStore.getAccessToken()
    console.log("accessToken", accessToken)
    if (accessToken) {
      setUser(jwtDecode<User>(accessToken))
    }
  }, [])

  const setLogin = (tokens: LoginFormTokens): void => {
    tokenStore.setAcessToken(tokens.accessToken)
    tokenStore.setRefreshToken(tokens.refreshToken)
    tokenStore.setRefreshTokenTTL(tokens.refreshTokenTTL)
    console.log("set tokens", tokens, jwtDecode<User>(tokens.accessToken))
    setUser(jwtDecode<User>(tokens.accessToken))
  }

  const logout = (): void => {
    tokenStore.removeAll()
    setUser(null)
  }

  const value = useMemo(() => ({ user, setLogin, logout }), [user, setLogin, logout])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

interface TokenStore {
  setAcessToken(accessToken: string): void
  setRefreshToken(refreshToken: string): void
  setRefreshTokenTTL(refreshTokenTTL: number): void
  getAccessToken(): string | null
  getRefreshToken(): string | null
  getRefreshTokenTTL(): number | null
  removeAll(): void
}

class TokenLocalStorage implements TokenStore {
  setAcessToken(accessToken: string): void {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  }
  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  }
  setRefreshTokenTTL(refreshTokenTTL: number): void {
    localStorage.setItem(REFRESH_TOKEN_TTL_KEY, refreshTokenTTL.toString())
  }
  getAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  }
  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  }
  getRefreshTokenTTL(): number | null {
    return Number(localStorage.getItem(REFRESH_TOKEN_TTL_KEY))
  }
  removeAll(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_TTL_KEY)
  }
}

class TokenCookieStorage implements TokenStore {
  setAcessToken(accessToken: string): void {
    Cookies.set(ACCESS_TOKEN_KEY, accessToken, {
      httpOnly: true,
      domain: ".eloxpro.com",
    })
  }
  setRefreshToken(refreshToken: string): void {
    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      domain: ".eloxpro.com",
    })
  }
  setRefreshTokenTTL(refreshTokenTTL: number): void {
    Cookies.set(REFRESH_TOKEN_TTL_KEY, refreshTokenTTL.toString(), {
      domain: ".eloxpro.com",
    })
  }
  getAccessToken(): string | null {
    return Cookies.get(ACCESS_TOKEN_KEY) || null
  }
  getRefreshToken(): string | null {
    return Cookies.get(REFRESH_TOKEN_KEY) || null
  }
  getRefreshTokenTTL(): number | null {
    return Number(Cookies.get(REFRESH_TOKEN_TTL_KEY)) || null
  }
  removeAll(): void {
    Cookies.remove(ACCESS_TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_KEY)
    Cookies.remove(REFRESH_TOKEN_TTL_KEY)
  }
}
