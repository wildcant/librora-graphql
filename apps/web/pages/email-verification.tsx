import { useDeepCompareEffect } from '@librora/utils/hooks'
import { useVerifyEmailMutation } from '@librora/api/operations/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useToast } from 'ui'

export default function EmailVerification() {
  const router = useRouter()
  const [verifyEmail, { error }] = useVerifyEmailMutation()

  const { notify } = useToast()

  useEffect(() => {
    const token = router.query.token

    if (router.isReady && !token) {
      router.replace('/sign-in')
    } else if (router.isReady && typeof token === 'string') {
      verifyEmail({
        variables: { input: { token } },
        onCompleted: ({ verifyEmail }) => {
          if (verifyEmail?.success) {
            notify(verifyEmail?.message ?? 'Email verified', { type: 'success' })
            router.replace('/sign-in')
          } else {
            router.replace(`/errors/expired-email-verification?token=${token}`)
          }
        },
        onError: (e) => notify(e.message, { type: 'error' }),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  useDeepCompareEffect(() => {
    error && notify(error.message, { type: 'error' })
  }, [error])

  return <div>Loading..</div>
}
