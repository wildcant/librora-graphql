import Image from 'next/image'

interface IAvatarProps {
  src: string
}

export function Avatar({ src }: IAvatarProps) {
  return <Image src={src} alt="temp" width={50} height={50} className="w-9 rounded-full sm:w-10 lg:w-12" />
}
