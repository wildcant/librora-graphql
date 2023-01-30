import { useResendVerificationEmailMutation } from 'api/operations/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Button, useToast } from 'ui'
import { DefaultLayout } from '../../components/Layout'

function ExpiredResetPassword() {
  const router = useRouter()
  const [resendVerificationEmail] = useResendVerificationEmailMutation()
  const { notify } = useToast()

  const resendVerification = () => {
    const token = router.query.token
    if (router.isReady && !token) {
      router.replace('/sign-in')
    } else if (router.isReady && typeof token === 'string') {
      resendVerificationEmail({
        variables: { token },
        onCompleted: ({ resendVerificationEmail }) => {
          if (resendVerificationEmail?.success) {
            notify(resendVerificationEmail?.message, { type: 'success' })
          }

          // TODO: Improve UX / error handling.
          router.replace('/sign-in')
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
        <Button onClick={resendVerification} variant="link">
          here
        </Button>{' '}
        to send the email again.
      </p>
    </div>
  )
}

ExpiredResetPassword.Layout = DefaultLayout

export default ExpiredResetPassword
