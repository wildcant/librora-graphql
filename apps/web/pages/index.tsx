import Image from 'next/image'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { Header, Link, Logo, SearchBar } from 'ui'
import markerArrow from '../public/arrow.svg'

interface ISearchBarProps {
  className?: string
}
function SearchBarContainer({ className }: ISearchBarProps) {
  const { control, handleSubmit } = useForm<{ search: string }>()
  const { push } = useRouter()

  return (
    <form
      onSubmit={handleSubmit((data) => {
        data.search && push(`/search/${data.search.trim().split(' ').join('-')}`)
      })}
      className={className}
    >
      <SearchBar control={control} name="search" placeholder="Search" />
    </form>
  )
}

export default function Home() {
  return (
    <div className="bg-secondary-lightest min-h-screen w-full bg-[url('../public/noise.png')]">
      <div className="container mx-auto flex h-full min-h-screen w-full flex-col items-center justify-around p-4 md:justify-between md:p-6">
        <div className="hidden md:mb-16 md:block md:w-full">
          <Header />
        </div>

        <Link href="/" className="mb-24 md:hidden" underline={false}>
          <Logo />
        </Link>

        <div>
          <h1 className="mb-16 text-center text-xl font-bold italic md:text-4xl">
            Find Your Next Favorite Read: <br /> Search for Books Now!
          </h1>

          <SearchBarContainer className="mb-16" />
        </div>

        <div className="relative flex flex-col">
          <h4 className="text-md mb-8 text-center md:text-2xl">
            Unleash the Power of Book Sharing <br /> Join Our Community Today
          </h4>
          <div className="mb-2 self-center md:hidden">
            <Link href="/sign-up" variant="button">
              Sign Up
            </Link>
          </div>
          <div className="-right-32 -top-24 hidden md:absolute md:block">
            <Image src={markerArrow} alt="" />
          </div>
        </div>

        <div className="md:hidden">
          <span className="mr-2 text-xs font-light">Already a member?</span>
          <Link href="/sign-in">Sign In</Link>
        </div>
      </div>
    </div>
  )
}
