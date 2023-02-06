import { useEnvironment } from '../env'
import { useEffect, useState } from 'react'

export type UseMediaQueryOptions = {
  fallback?: boolean | boolean[]
  ssr?: boolean
}

/**
 * React hook that tracks state of a CSS media query
 *
 * @param query the media query to match
 * @param options the media query options { fallback, ssr }
 * @example
 * const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)')
 */
export function useMediaQuery(query: string | string[], options: UseMediaQueryOptions = {}): boolean[] {
  const { ssr = true, fallback } = options

  const env = useEnvironment()

  const queries = Array.isArray(query) ? query : [query]

  let fallbackValues = Array.isArray(fallback) ? fallback : [fallback]
  fallbackValues = fallbackValues.filter((v) => v != null) as boolean[]

  const [value, setValue] = useState(() => {
    return queries.map((q, index) => ({
      media: q,
      matches: ssr ? !!fallbackValues[index] : env.window.matchMedia(q).matches,
    }))
  })

  useEffect(() => {
    setValue(
      queries.map((q) => ({
        media: q,
        matches: env.window.matchMedia(q).matches,
      }))
    )

    const mqls = queries.map((q) => env.window.matchMedia(q))

    const handler = (evt: MediaQueryListEvent) => {
      setValue((prev) => {
        return prev.slice().map((item) => {
          if (item.media === evt.media) return { ...item, matches: evt.matches }
          return item
        })
      })
    }

    mqls.forEach((mql) => mql.addEventListener('change', handler))

    return () => {
      mqls.forEach((mql) => mql.removeEventListener('change', handler))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [env.window])

  return value.map((item) => item.matches)
}
