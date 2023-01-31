import { ReactNode } from 'react'
import { Link } from 'ui'
import { BaseLayout } from './BaseLayout'
import cn from 'classnames'
import Image from 'next/image'
import signUpPic from '../../public/sign-uo.webp'

interface IAuthLayoutProps {
  children: ReactNode
  image?: ReactNode
  imageContainerClassName?: string
}

export default function AuthLayout({
  children,
  image = <Image src={signUpPic} alt="Registration image" className="w-full self-center" />,
  imageContainerClassName = 'bg-[#8178B1]',
}: IAuthLayoutProps) {
  return (
    <BaseLayout>
      <div className="bg-secondary-lightest flex h-full min-h-screen w-full items-center justify-center bg-[url('../public/noise.png')]">
        <div
          className="d:p-12 container h-fit gap-4 md:rounded-md md:border md:border-neutral-200 lg:grid lg:min-h-[672px] lg:max-w-5xl lg:grid-cols-12"
          role="presentation"
        >
          {/* 1 Col Gap */}
          <div className="hidden lg:col-span-1 lg:block" />

          {/* Form */}
          <div className=" py-16 px-6 md:px-12 lg:col-span-4 lg:py-10 lg:px-0">{children}</div>

          {/* 1 Col Gap */}
          <div className="hidden lg:col-span-1 lg:block" />

          {/* Desktop Side Image */}
          <div className="hidden lg:col-span-6 lg:block lg:p-0">
            <div
              className={cn(
                'flex h-full place-self-center rounded-tr-md lg:relative',
                imageContainerClassName
              )}
            >
              {image}
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
    </BaseLayout>
  )
}
