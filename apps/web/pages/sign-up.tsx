import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateUserMutation } from '@librora/api/operations/client'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, CheckboxField, Link, Logo, TextField, useToast } from 'ui'
import z from 'zod'
import { AuthLayout } from '../components/layouts/AuthLayout'

const FormSchema = z.object({
  acceptTerms: z.boolean({ required_error: 'You must accept the terms and conditions' }),
  confirm: z.string({ required_error: 'Confirm your password' }),
  email: z.string({ required_error: 'Enter your email' }).email(),
  firstName: z
    .string({ required_error: 'Enter your first name' })
    .min(1, { message: 'Your first name is too small.' })
    .max(50, { message: 'Your first name is too long.' }),
  lastName: z
    .string({ required_error: 'Enter your last name' })
    .min(1, { message: 'Your last name is too small.' })
    .max(50, { message: 'Your last name is too long.' }),
  password: z.string({ required_error: 'Enter a password' }).min(5).max(50),
  username: z.string({ required_error: 'Enter a username' }).min(2).max(50),
})
type FromData = z.infer<typeof FormSchema>

export default function SignUp() {
  const [createUser, { loading, data }] = useCreateUserMutation()
  const { notify } = useToast()
  const { control, handleSubmit } = useForm<FromData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: 'Willy',
      lastName: 'Wonka',
      username: 'willo',
      email: 'testing.apps.wc@gmail.com',
      password: '12345',
      confirm: '12345',
      acceptTerms: true,
    },
  })

  const submit = (formData: FromData) => {
    const { email, firstName, lastName, password, username } = formData
    createUser({ variables: { input: { email, firstName, lastName, password, username } } })
  }

  const { message, success } = data?.createUser ?? {}
  useEffect(() => {
    success && notify(message ?? 'Success', { type: 'success' })
  }, [message, success, notify])

  return (
    <AuthLayout>
      <Logo />
      <p className="text-xl">Create your Librora account</p>
      <p className="mb-4 text-base">To continue</p>
      {/* 
      // TODO: Google auth.
      <div className="flex justify-center">
        <Button
          size="xs"
          variant="outline"
          icon={<Icon name="google" className="fill-primary-600" size="sm" />}
          iconPosition="right"
        >
          Sign up with google
        </Button>
      </div>

      <Divider className="my-4 text-xs">Or</Divider>
      */}
      <form onSubmit={handleSubmit(submit)}>
        <div className="md:grid md:grid-cols-2 md:gap-x-1 md:gap-y-4">
          <TextField control={control} name="firstName" label="First name" className="mb-6 md:mb-0" />
          <TextField control={control} name="lastName" label="Last name" className="mb-6 md:mb-0" />
          <TextField control={control} name="username" label="Username" className="mb-6 md:mb-0" />
          <TextField control={control} name="email" label="Email" className="mb-6 md:mb-0" />
          <TextField
            control={control}
            name="password"
            label="Password"
            type="password"
            className="mb-6 md:mb-0"
          />
          <TextField control={control} name="confirm" label="Confirm" type="password" className="mb-6" />
        </div>

        <CheckboxField
          control={control}
          name="acceptTerms"
          label="I accept Librora terms and conditions."
          className="mb-8 text-xs md:text-sm"
        />
        <div className="flex justify-center">
          <Button type="submit" size="sm" isLoading={loading} loadingText="Uploading">
            Create Account
          </Button>
        </div>
      </form>
      <div className="mt-2 flex flex-row items-center justify-center text-neutral-900">
        <span className="text-xs">Already have an account?</span>{' '}
        <Link href="sign-in" size="sm" className="ml-2">
          Sign In
        </Link>
      </div>
    </AuthLayout>
  )
}
