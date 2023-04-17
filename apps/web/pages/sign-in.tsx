import { zodResolver } from '@hookform/resolvers/zod'
import { useSignInMutation } from '@librora/api/operations/client'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Button, Link, Logo, TextField, useToast } from 'ui'
import z from 'zod'
import { setAuthValues, useAuthLocalStorage } from '~store/auth'
import { AUTH_TOKEN_COOKIE_KEY } from '~store/auth/constants'
import { AuthLayout } from '../components/layouts/AuthLayout'
import signInPic from '../public/sign-in.webp'

const FormSchema = z.object({
  account: z
    .string({ required_error: 'Enter your username or email.' })
    .min(1, { message: 'Enter your username or email.' }),
  password: z.string({ required_error: 'Enter your password' }).min(1, { message: 'Enter your password' }),
})

type FormData = z.infer<typeof FormSchema>

export default function SignIn() {
  const router = useRouter()
  const [signIn, { loading }] = useSignInMutation()
  const { notify } = useToast()
  const { control, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: { account: 'willo', password: '12345' },
  })
  const [_, storeAuth] = useAuthLocalStorage()

  const submit = (input: FormData) => {
    signIn({
      variables: { input },
      onCompleted: (response) => {
        const { success, message, user, token, expires } = response?.signIn ?? {}
        if (!success) {
          notify(message ?? 'There was a problem trying to login.', { type: 'warning' })
        } else if (success && user && token && expires) {
          setAuthValues({ user, token, expires })
          storeAuth({ user, token, expires })
          Cookies.set(AUTH_TOKEN_COOKIE_KEY, token, { expires: new Date(expires * 1000) })
          router.replace('/')
        }
      },
      onError: (error) => notify(error.message, { type: 'error' }),
    })
  }

  return (
    <AuthLayout
      image={<Image src={signInPic} alt="Registration image" className="w-full self-center" />}
      imageContainerClassName="bg-secondary-200"
    >
      <Logo />
      <p className="text-xl">Welcome Back</p>
      <p className="mb-4 text-base">To continue</p>
      {/* Verify the email address of your account by logging in. */}
      {/* 
      TODO: Google auth.
      <div className="flex justify-center">
        <Button
          size="xs"
          variant="outline"
          icon={<Icon name="google" className="fill-primary-600" size="sm" />}
          iconPosition="right"
        >
          Sign in with google
        </Button>
      </div>

      <Divider className="my-4 text-xs">Or</Divider>
      */}
      <form onSubmit={handleSubmit(submit)} className="mb-6">
        <div className="mb-8">
          <TextField control={control} name="account" label="Username" className="mb-6" />
          <TextField control={control} name="password" label="Password" type="password" />
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
