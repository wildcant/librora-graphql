import { zodResolver } from '@hookform/resolvers/zod'
import { useDeepCompareEffect } from '@librora/utils/hooks'
import { useSignInMutation } from 'api/operations/client'
import Image from 'next/image'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Divider, Icon, Link, Logo, TextField, useToast } from 'ui'
import z from 'zod'
import { DefaultLayout } from '../components/Layout'
import signInPic from '../public/sign-in.png'

const SignInForm = z.object({
  // account can be the username or email
  account: z.string({ required_error: 'Enter your username' }),
  password: z.string({ required_error: 'Enter your password' }),
})

type SignInFormData = z.infer<typeof SignInForm>

function SignUp() {
  const [signIn, { loading, data, called, error }] = useSignInMutation()

  const { notify } = useToast()
  const { control, handleSubmit } = useForm<SignInFormData>({
    resolver: zodResolver(SignInForm),
    // defaultValues: {
    //   // account: 'willo@mail.com',
    //   account: 'willo',
    //   password: '12345',
    // },
  })

  const submitSignIn = (input: SignInFormData) => {
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
          <p className="text-xl">Welcome Back</p>
          <p className="mb-4 text-base">To continue</p>
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

          <form onSubmit={handleSubmit(submitSignIn)} className="mb-6">
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
                <Link href="password-reset" size="xs">
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

SignUp.Layout = DefaultLayout

export default SignUp
