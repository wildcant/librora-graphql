import { CheckboxField, TextField, Logo, Button } from 'ui'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import registrationPic from '../public/registration.png'

type RegistrationForm = {
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  confirm: string
  acceptTerms: boolean
}

export default function Register() {
  const { control, handleSubmit } = useForm<RegistrationForm>()

  const displayError = () => {}
  return (
    <div className="bg-secondary-lightest flex h-full min-h-screen w-full items-center justify-center bg-[url('../public/noise.png')]">
      <div
        className="container h-fit p-6 md:rounded-md md:border md:border-neutral-200 md:p-12 lg:max-w-4xl lg:px-28"
        role="presentation"
      >
        <div className="lg:flex lg:items-center lg:gap-8">
          <div>
            <Logo />
            <p className="text-2xl">Create your Librora account</p>
            <p className="mb-8 text-xl">To continue</p>
            <form onSubmit={handleSubmit(displayError)}>
              <div className="md:grid md:grid-cols-2 md:gap-x-1 md:gap-y-4">
                <TextField
                  control={control}
                  name="firstName"
                  rules={{ required: 'Enter your first name' }}
                  label="First name"
                  colorScheme="bg-secondary-lightest"
                  className="mb-6 md:mb-0"
                />
                <TextField
                  control={control}
                  name="lastName"
                  rules={{ required: 'Enter your last name' }}
                  label="Last name"
                  colorScheme="bg-secondary-lightest"
                  className="mb-6 md:mb-0"
                />
                <TextField
                  control={control}
                  name="username"
                  rules={{ required: 'Enter a username' }}
                  label="Username"
                  colorScheme="bg-secondary-lightest"
                  className="mb-6 md:mb-0"
                />
                <TextField
                  control={control}
                  name="email"
                  rules={{ required: 'Enter your email' }}
                  label="Email"
                  colorScheme="bg-secondary-lightest"
                  className="mb-6 md:mb-0"
                />
                <TextField
                  control={control}
                  name="password"
                  rules={{ required: 'Enter a password' }}
                  label="Password"
                  type="password"
                  colorScheme="bg-secondary-lightest"
                  className="mb-6 md:mb-0"
                />
                <TextField
                  control={control}
                  name="confirm"
                  rules={{ required: 'Confirm your password' }}
                  label="Confirm"
                  type="password"
                  colorScheme="bg-secondary-lightest"
                  className="mb-8"
                />
              </div>

              <CheckboxField
                control={control}
                name="acceptTerms"
                label="I accept Librora terms and conditions."
                className="mb-8 text-xs md:text-sm"
              />
              <div className="flex justify-center md:justify-end">
                <Button type="submit" size="sm">
                  Register
                </Button>
              </div>
            </form>
          </div>
          <div className="hidden lg:block lg:flex-1">
            <Image src={registrationPic} alt="Registration image" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
