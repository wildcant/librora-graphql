import { Link } from 'ui'
import React from 'react'

export default function ExpiredResetPassword() {
  return (
    <div>
      <p>Your email to reset your password has expired.</p>
      <p>
        Please click <Link href={'/forgot-password'}>here</Link> to request the email again.
      </p>
    </div>
  )
}
