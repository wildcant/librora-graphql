import { zodResolver } from '@hookform/resolvers/zod'
import { useDeepCompareEffect } from '@librora/utils/hooks'
import { useForgotPasswordMutation } from '@librora/api/operations/client'
import { useForm } from 'react-hook-form'
import { Button, Link, Logo, TextField, useToast } from 'ui'
import z from 'zod'
import AuthLayout from '../components/layouts/AuthLayout'

const FormSchema = z.object({ email: z.string({ required_error: 'Enter your email' }).email() })
type FormData = z.infer<typeof FormSchema>

export default function ForgotPassword() {
  const [forgotPassword, { loading, data, error }] = useForgotPasswordMutation()

  const { notify } = useToast()
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    // defaultValues: { email: 'willo@mail.com' },
  })

  useDeepCompareEffect(() => {
    error && notify(error.message, { type: 'error' })
  }, [error])

  return (
    <AuthLayout>
      <Logo />

      {data?.forgotPassword?.success ? (
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
          <form onSubmit={handleSubmit((input) => forgotPassword({ variables: { input } }))}>
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
    </AuthLayout>
  )
}
