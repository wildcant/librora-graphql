import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateUserMutation } from 'api/operations/client'
import Image from 'next/image'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { UserSchema } from 'schemas'
import { Button, CheckboxField, Divider, Icon, Link, Logo, TextField, useToast } from 'ui'
import z from 'zod'
import { DefaultLayout } from '../components/Layout'
import signUpPic from '../public/sign-up.png'

const SignUpForm = UserSchema.pick({
  email: true,
  firstName: true,
  lastName: true,
  password: true,
  username: true,
}).extend({
  acceptTerms: z.boolean({ required_error: 'You must accept the terms and conditions' }),
  confirm: z.string({ required_error: 'Confirm your password' }),
})

type SignUpFormData = z.infer<typeof SignUpForm>

function SignUp() {
  const [createUser, { loading, error, data }] = useCreateUserMutation()
  const { notify } = useToast()
  const { control, handleSubmit } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpForm),
    // defaultValues: {
    //   firstName: 'Willy',
    //   lastName: 'Wonka',
    //   username: 'willo',
    //   email: 'willo@mail.com',
    //   password: '12345',
    //   confirm: '12345',
    //   acceptTerms: true,
    // },
  })

  const submitRegistration = (data: SignUpFormData) => {
    const { email, firstName, lastName, password, username } = data
    createUser({ variables: { input: { email, firstName, lastName, password, username } } })
  }

  useEffect(() => {
    if (data?.createUser?.success) {
      notify(data?.createUser?.message ?? 'Success')
    }
  }, [data?.createUser?.message, data?.createUser?.success, notify])

  return (
    <div className="bg-secondary-lightest flex h-full min-h-screen w-full items-center justify-center bg-[url('../public/noise.png')]">
      <div
        className="d:p-12 container h-fit gap-4 md:rounded-md md:border md:border-neutral-200 lg:grid lg:min-h-[672px] lg:max-w-5xl lg:grid-cols-12"
        role="presentation"
      >
        {/* 1 Col Gap */}
        <div className="hidden lg:col-span-1 lg:block" />

        {/* Form */}
        <div className=" py-16 px-6 md:px-12 lg:col-span-4 lg:py-10 lg:px-0">
          <Logo />
          <p className="text-xl">Create your Librora account</p>
          <p className="mb-4 text-base">To continue</p>
          <div className="flex justify-center">
            <Button
              size="xs"
              variant="outline"
              icon={<Icon name="google" className="fill-primary-base" size="sm" />}
              iconPosition="right"
            >
              Sign up with google
            </Button>
          </div>

          <Divider className="my-4 text-xs">Or</Divider>

          <form onSubmit={handleSubmit(submitRegistration)}>
            <div className="md:grid md:grid-cols-2 md:gap-x-1 md:gap-y-4">
              <TextField
                control={control}
                name="firstName"
                label="First name"
                colorScheme="bg-secondary-lightest"
                className="mb-6 md:mb-0"
              />
              <TextField
                control={control}
                name="lastName"
                label="Last name"
                colorScheme="bg-secondary-lightest"
                className="mb-6 md:mb-0"
              />
              <TextField
                control={control}
                name="username"
                label="Username"
                colorScheme="bg-secondary-lightest"
                className="mb-6 md:mb-0"
              />
              <TextField
                control={control}
                name="email"
                label="Email"
                colorScheme="bg-secondary-lightest"
                className="mb-6 md:mb-0"
              />
              <TextField
                control={control}
                name="password"
                label="Password"
                type="password"
                colorScheme="bg-secondary-lightest"
                className="mb-6 md:mb-0"
              />
              <TextField
                control={control}
                name="confirm"
                label="Confirm"
                type="password"
                colorScheme="bg-secondary-lightest"
                className="mb-6"
              />
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
        </div>

        {/* 1 Col Gap */}
        <div className="hidden lg:col-span-1 lg:block" />

        {/* Desktop Side Image */}
        <div className="hidden lg:col-span-6 lg:block lg:p-0">
          <div className="flex h-full place-self-center rounded-tr-md bg-[#8178B1] lg:relative">
            <Image src={signUpPic} alt="Registration image" className="w-full self-center" />
            <div className="absolute bottom-1 right-2 text-neutral-50">
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
