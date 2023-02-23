import Image from 'next/image'

type AvatarProps = {
  src: string
}

export function Avatar({ src }: AvatarProps) {
  return (
    <Image src={src} alt="User avatar" width={48} height={48} className="w-9 rounded-full sm:w-10 lg:w-12" />
  )
}
