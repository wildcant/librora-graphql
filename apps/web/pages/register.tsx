import { TextField } from '@molecules'
import { useForm } from 'react-hook-form'

export default function Register() {
  const { control, handleSubmit } = useForm<{ [key: string]: string }>()

  const displayError = () => {}
  return (
    <div>
      <form onSubmit={handleSubmit(displayError)}>
        <TextField
          control={control}
          name={'lastName'}
          rules={{ required: 'This field is required' }}
          label="Last name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}