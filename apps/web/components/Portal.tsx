import { ReactNode, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export function Portal(props: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted ? createPortal(props.children, document.querySelector('#loader') as Element) : null
}
