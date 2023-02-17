import { Book } from '@librora/api/schema'
import format from 'date-fns/format'
import Image from 'next/image'

export function BookCard({ title, date, cover }: Book) {
  return (
    <div className="flex flex-col cursor-pointer h-full">
      {cover && (
        <div className="w-[100%] h-44 lg:h-64 relative">
          <Image src={cover} alt="book" fill className="object-cover rounded-2xl" />
        </div>
      )}

      <div className="p-1 flex flex-1 flex-col justify-between lg:p-2">
        <h1 className="text-sm font-roboto font-semibold lg:text-md">{title}</h1>
        <h5 className="text-sm font-roboto font-bold text-secondary-600">{format(new Date(date), 'yyyy')}</h5>
      </div>
    </div>
  )
}
