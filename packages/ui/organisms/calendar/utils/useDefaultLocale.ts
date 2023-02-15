export type Direction = 'ltr' | 'rtl'

const RTL_SCRIPTS = new Set(['Arab', 'Syrc', 'Samr', 'Mand', 'Thaa', 'Mend', 'Nkoo', 'Adlm', 'Rohg', 'Hebr'])
const RTL_LANGS = new Set([
  'ae',
  'ar',
  'arc',
  'bcc',
  'bqi',
  'ckb',
  'dv',
  'fa',
  'glk',
  'he',
  'ku',
  'mzn',
  'nqo',
  'pnb',
  'ps',
  'sd',
  'ug',
  'ur',
  'yi',
])

/**
 * Determines if a locale is read right to left using [Intl.Locale]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale}.
 */
export function isRTL(locale: string) {
  // If the Intl.Locale API is available, use it to get the script for the locale.
  // This is more accurate than guessing by language, since languages can be written in multiple scripts.
  if (Intl.Locale) {
    const script = new Intl.Locale(locale).maximize().script
    return script ? RTL_SCRIPTS.has(script) : false
  }

  // If not, just guess by the language (first part of the locale)
  const lang = locale.split('-')[0]
  return RTL_LANGS.has(lang)
}

import { useEffect, useState } from 'react'

const canUseDOM = Boolean(typeof window !== 'undefined' && window.document && window.document.createElement)

export interface Locale {
  /** The [BCP47](https://www.ietf.org/rfc/bcp/bcp47.txt) language code for the locale. */
  locale: string
  /** The writing direction for the locale. */
  direction: Direction
}

/**
 * Gets the locale setting of the browser.
 */
export function getDefaultLocale(): Locale {
  let locale =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (typeof navigator !== 'undefined' && (navigator.language || (window.navigator as any)['userLanguage'])) ||
    'en-US'
  try {
    Intl.DateTimeFormat.supportedLocalesOf([locale])
  } catch (_err) {
    locale = 'en-US'
  }
  return {
    locale,
    direction: isRTL(locale) ? 'rtl' : 'ltr',
  }
}

let currentLocale = getDefaultLocale()
const listeners = new Set<(locale: Locale) => void>()

function updateLocale() {
  currentLocale = getDefaultLocale()
  for (const listener of listeners) {
    listener(currentLocale)
  }
}

/**
 * Returns the current browser/system language, and updates when it changes.
 */
export function useDefaultLocale(): Locale {
  const [defaultLocale, setDefaultLocale] = useState(currentLocale)

  useEffect(() => {
    if (listeners.size === 0) {
      window.addEventListener('languagechange', updateLocale)
    }

    listeners.add(setDefaultLocale)

    return () => {
      listeners.delete(setDefaultLocale)
      if (listeners.size === 0) {
        window.removeEventListener('languagechange', updateLocale)
      }
    }
  }, [])

  // To keep things simple I'll use one single locale and timezone.
  return {
    locale: 'en-US',
    direction: 'ltr',
  }

  // We cannot determine the browser's language on the server, so default to
  // en-US. This will be updated after hydration on the client to the correct value.
  if (!canUseDOM) {
    return {
      locale: 'en-US',
      direction: 'ltr',
    }
  }

  return defaultLocale
}
