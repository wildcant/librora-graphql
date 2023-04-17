import { makeVar, useReactiveVar } from '@apollo/client'
import { SignInMutation } from '@librora/api/schema'
import { useLocalStorage } from '@librora/utils/hooks'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useApollo } from '../../lib/apollo'
import { NonMaybeRecursive } from '../../types'
import { AUTH_LOCAL_STORAGE_KEY, AUTH_TOKEN_COOKIE_KEY } from './constants'

export type AuthState = NonMaybeRecursive<
  Pick<NonNullable<SignInMutation['signIn']>, 'user' | 'token' | 'expires'>
>

const authInitialValues: AuthState = {
  user: undefined,
  token: undefined,
}

const authVar = makeVar<AuthState>(authInitialValues)

export const getAuthValues = (): AuthState => authVar()
export const useAuthState = (): AuthState => useReactiveVar(authVar)
export const setAuthValues = (values: AuthState) => authVar(values)

export const useAuthLocalStorage = () =>
  useLocalStorage<AuthState | undefined>(AUTH_LOCAL_STORAGE_KEY, undefined)

export const useLogout = () => {
  const { cache } = useApollo()
  const [_, __, clearAuth] = useAuthLocalStorage()
  const router = useRouter()

  const logout = useCallback(() => {
    authVar(authInitialValues)
    cache.restore({})
    clearAuth()
    Cookies.remove(AUTH_TOKEN_COOKIE_KEY)
    router.push('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { logout }
}

export const useAuthEffects = () => {
  const { logout } = useLogout()
  const { expires } = useAuthState()
  const [storedAuth] = useAuthLocalStorage()

  useEffect(() => {
    const isTokenExpired = expires && expires * 1000 < Date.now()

    if (isTokenExpired) logout()
    if (storedAuth) authVar(storedAuth)
  }, [expires, storedAuth, logout])
}

export const useAuthFlags = () => {
  const isAuthenticated = !!useAuthState().token
  return { isAuthenticated }
}
