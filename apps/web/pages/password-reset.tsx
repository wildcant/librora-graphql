import { zodResolver } from '@hookform/resolvers/zod'
import { useDeepCompareEffect } from '@librora/utils/hooks'
import { useResetPasswordMutation } from 'api/operations/client'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { UserSchema } from 'schemas'
import { Button, Link, Logo, TextField, useToast } from 'ui'
import z from 'zod'
import { DefaultLayout } from '../components/Layout'
import signInPic from '../public/sign-in.png'

const ResetPassword = UserSchema.pick({
  email: true,
})

type ResetPasswordData = z.infer<typeof ResetPassword>

function PasswordReset() {
  const [resetPassword, { loading, data, error }] = useResetPasswordMutation()

  const { notify } = useToast()
  const { control, handleSubmit } = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPassword),
    // defaultValues: {
    //   email: 'willo@mail.com',
    // },
  })

  const submitSignIn = (input: ResetPasswordData) => {
    resetPassword({ variables: { input } })
  }

  useDeepCompareEffect(() => {
    if (error) {
      notify(error.message, { type: 'error' })
    }
  }, [error])

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

          {data?.resetPassword?.success ? (
            <>
              <p className="mb-6 text-xl">Forgot Password</p>
              <p className="mb-8 text-sm">
                If we found an eligible account associated with that username, we&apos;ve sent password reset
                instructions to the primary email address on the account.
              </p>

              <div className="mt-2 text-neutral-900">
                <span className="text-xs">Don&apos;t have a Librora account?</span>{' '}
                <Link href="sign-up" size="sm" className="ml-2">
                  Sign Up
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="mb-6 text-xl">Forgot Password?</p>
              <p className="mb-8 text-sm">
                Enter the email address you used when you joined and we&apos;ll send you instructions to reset
                your password.
              </p>
              <form onSubmit={handleSubmit(submitSignIn)}>
                <div className="mb-8">
                  <TextField
                    control={control}
                    name="email"
                    label="Email"
                    colorScheme="bg-secondary-lightest"
                    className="mb-12"
                  />
                </div>

                <div className="flex justify-center">
                  <Button type="submit" size="sm" isLoading={loading}>
                    Send Reset Instructions
                  </Button>
                </div>
              </form>

              <div className="mt-2 flex flex-row items-center justify-center text-neutral-900">
                <span className="text-xs">Not a member?</span>{' '}
                <Link href="sign-up" size="sm" className="ml-2">
                  Sign Up
                </Link>
              </div>
            </>
          )}
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

PasswordReset.Layout = DefaultLayout

export default PasswordReset
