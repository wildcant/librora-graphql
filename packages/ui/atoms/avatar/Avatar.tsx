import Image from 'next/image'
import cn from 'classnames'

type AvatarProps = {
  src: string
  className?: string
}

export function Avatar({ src, className }: AvatarProps) {
  return (
    <Image
      src={src}
      alt="User avatar"
      width={48}
      height={48}
      className={cn('w-9 rounded-full sm:w-10 lg:w-12', className)}
    />
  )
}
