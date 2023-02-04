import { useResendVerificationEmailMutation } from '@librora/api/operations/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, useToast } from 'ui'
import { BaseLayout } from '../../components/layouts/BaseLayout'
import { useGlobalState } from '../../store/global'

function ExpiredResetPassword() {
  const router = useRouter()
  const [resendVerificationEmail] = useResendVerificationEmailMutation()
  const { notify } = useToast()
  const [_, setGlobalState] = useGlobalState()
  const [submitted, setSubmitted] = useState(false)

  const resendVerification = () => {
    setGlobalState({ isLoadingGlobal: true })

    const token = router.query.token

    if (router.isReady && !token) {
      router.replace('/sign-in')
    } else if (router.isReady && typeof token === 'string') {
      resendVerificationEmail({
        variables: { token },

        onCompleted: async (response) => {
          setGlobalState({ isLoadingGlobal: false })
          setSubmitted(true)
          const { success, message } = response?.resendVerificationEmail ?? {}
          if (success) {
            notify(message, { type: 'success' })
          }

          setTimeout(() => router.replace('/sign-in'), 5000)
        },

        onError: (e) => notify(e.message, { type: 'error' }),
      })
    }
  }

  useEffect(() => {
    const token = router.query.token

    if (router.isReady && !token) {
      router.replace('/sign-in')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  return (
    <div>
      <p>Your link to confirm your email has expired.</p>
      <p>
        Please click{' '}
        <Button onClick={resendVerification} variant="link" disabled={submitted}>
          here
        </Button>{' '}
        to send the email again.
      </p>
    </div>
  )
}

ExpiredResetPassword.Layout = BaseLayout

export default ExpiredResetPassword
