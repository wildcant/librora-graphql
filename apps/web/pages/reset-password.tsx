import { zodResolver } from '@hookform/resolvers/zod'
import { useDeepCompareEffect } from '@librora/utils/hooks'
import { useResetPasswordMutation, useValidateActionMutation } from 'api/operations/client'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Link, Logo, TextField, useToast } from 'ui'
import z from 'zod'
import { DefaultLayout } from '../components/Layout'
import signInPic from '../public/sign-in.png'

const FormSchema = z
  .object({ newPassword: z.string({ required_error: '' }).min(5).max(50), confirm: z.string() })
  .refine((a) => a.newPassword === a.confirm)
type FormData = z.infer<typeof FormSchema>

function ResetPassword() {
  const router = useRouter()
  const [resetPassword, { loading, error, data }] = useResetPasswordMutation()
  const [validateAction] = useValidateActionMutation()

  const { notify } = useToast()
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    // defaultValues: { newPassword: '12345', confirm: '12345' },
  })

  const submit = ({ newPassword }: FormData) => {
    if (!router.query.token) {
      notify('There was a problem processing your request.', { type: 'error' })
      return
    }

    resetPassword({ variables: { input: { token: router.query.token as string, newPassword } } })
  }

  useEffect(() => {
    const token = router.query.token

    if (router.isReady && !token) {
      router.replace('/errors/expired-reset-password')
    } else if (router.isReady && typeof token === 'string') {
      // If action is not valid or expired then redirect to error page.
      validateAction({
        variables: { id: token },
        onCompleted: (response) =>
          !response.validateAction?.valid && router.replace('/errors/expired-reset-password'),
        onError: () => router.replace('/errors/expired-reset-password'),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  useDeepCompareEffect(() => {
    error && notify(error.message, { type: 'error' })
  }, [error])

  const { success, message } = data?.resetPassword ?? {}
  useEffect(() => {
    if (success) {
      notify(message, { type: 'success' })
      router.replace('/sign-in')
    }
  }, [success, message, notify, router])

  if (!router.isReady) {
    // TODO: Add loading component.
    return <div>Loading...</div>
  }

  return (
    <div className="bg-secondary-lightest flex h-full min-h-screen w-full items-center justify-center bg-[url('../public/noise.png')]">
      <div
        className="d:p-12 container h-fit gap-4 md:rounded-md md:border md:border-neutral-200 lg:grid lg:min-h-[672px] lg:max-w-5xl lg:grid-cols-12"
        role="presentation"
      >
        {/* 1 Col Gap */}
        <div className="hidden lg:col-span-1 lg:block" />

        {/* Form */}
        <div className="py-16 px-6 md:px-12 lg:col-span-4 lg:py-10 lg:px-0">
          <Logo />

          <p className="mb-6 text-xl">Reset Password</p>
          <form onSubmit={handleSubmit(submit)}>
            <TextField
              control={control}
              className="mb-8"
              colorScheme="bg-secondary-lightest"
              label="New Password"
              name="newPassword"
              type="password"
            />
            <TextField
              control={control}
              className="mb-12"
              colorScheme="bg-secondary-lightest"
              label="Confirm New Password"
              name="confirm"
              type="password"
            />

            <div className="flex justify-center">
              <Button type="submit" size="sm" isLoading={loading}>
                Reset
              </Button>
            </div>
          </form>

          <div className="mt-8 flex flex-row items-center justify-center text-neutral-900">
            {/* <span className="text-xs">Not a member?</span>{' '} */}
            <Link href="sign-up" size="sm" className="ml-2">
              Login
            </Link>
          </div>
        </div>

        {/* 1 Col Gap */}
        <div className="hidden lg:col-span-1 lg:block" />

        {/* Desktop Side Image */}
        <div className="hidden lg:col-span-6 lg:block lg:p-0">
          <div className="bg-secondary-light flex h-full place-self-center rounded-tr-md lg:relative">
            <Image src={signInPic} alt="Registration image" className="w-full self-center" />
            <div className="absolute bottom-1 right-2 text-neutral-900">
              <span className="text-xs">Art by</span>{' '}
              <Link variant="unstyled" className="text-xs underline" href="https://dribbble.com/tarka">
                Peter Tarka
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

ResetPassword.Layout = DefaultLayout

export default ResetPassword
