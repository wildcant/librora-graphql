import { zodResolver } from '@hookform/resolvers/zod'
import { useDeepCompareEffect } from '@librora/utils/hooks'
import { useSignInMutation } from 'api/operations/client'
import Image from 'next/image'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Divider, Icon, Link, Logo, TextField, useToast } from 'ui'
import z from 'zod'
import AuthLayout from '../components/layouts/AuthLayout'
import { BaseLayout } from '../components/layouts/BaseLayout'
import signInPic from '../public/sign-in.webp'

const FormSchema = z.object({
  account: z.string({ required_error: 'Enter your username or email.' }),
  password: z.string({ required_error: 'Enter your password' }),
})

type FormData = z.infer<typeof FormSchema>

export default function SignUp() {
  const [signIn, { loading, data, called, error }] = useSignInMutation()

  const { notify } = useToast()
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    // defaultValues: { account: 'willo@mail.com', account: 'willo', password: '12345' },
  })

  const submit = (input: FormData) => {
    signIn({ variables: { input } })
  }

  useDeepCompareEffect(() => {
    if (error) {
      notify(error.message, { type: 'error' })
    }
  }, [error])

  const { message, success } = data?.signIn ?? {}

  useEffect(() => {
    if (called && !success && message) {
      notify(message, { type: 'warning' })
    }
  }, [called, message, notify, success])

  return (
    <AuthLayout
      image={<Image src={signInPic} alt="Registration image" className="w-full self-center" />}
      imageContainerClassName="bg-secondary-light"
    >
      <Logo />
      <p className="text-xl">Welcome Back</p>
      <p className="mb-4 text-base">To continue</p>
      {/* Verify the email address of your account by logging in. */}
      <div className="flex justify-center">
        <Button
          size="xs"
          variant="outline"
          icon={<Icon name="google" className="fill-primary-base" size="sm" />}
          iconPosition="right"
        >
          Sign in with google
        </Button>
      </div>

      <Divider className="my-4 text-xs">Or</Divider>

      <form onSubmit={handleSubmit(submit)} className="mb-6">
        <div className="mb-8">
          <TextField
            control={control}
            name="account"
            label="Username"
            colorScheme="bg-secondary-lightest"
            className="mb-6"
          />
          <TextField
            control={control}
            name="password"
            label="Password"
            type="password"
            colorScheme="bg-secondary-lightest"
          />
          <div className="flex justify-end">
            <Link href="/forgot-password" size="xs">
              Forgot password?
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Button type="submit" size="sm" isLoading={loading}>
            Sign In
          </Button>
        </div>
      </form>

      <div className="mt-2 flex flex-row items-center justify-center text-neutral-900">
        <span className="text-xs">Don&apos;t have an account yet?</span>{' '}
        <Link href="sign-up" size="sm" className="ml-2">
          Sign Up
        </Link>
      </div>
    </AuthLayout>
  )
}
