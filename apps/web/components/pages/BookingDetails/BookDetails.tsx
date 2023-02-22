import { BookBySlugQuery } from '@librora/api/schema'
import format from 'date-fns/format'
import Image from 'next/image'
import { Button, DateRangePicker, Icon } from 'ui'
import s from './BookDetails.module.css'
const defaultBookImage = ''
function BookingForm() {
  return (
    <div className="border border-neutral-200 rounded-xl p-6 flex flex-col items-center max-w-md gap-8">
      <DateRangePicker />
      <Button size="sm">Reserve</Button>
    </div>
  )
}

type IBookingDetailsProps = NonNullable<BookBySlugQuery['book']>

export function BookingDetails({
  title,
  author,
  cover,
  numPages,
  language,
  description,
  date,
}: IBookingDetailsProps) {
  return (
    <div className={s.Container}>
      <h1 className={s.Title}>{title}</h1>

      {author && <p className={s.Author}>{author.name}</p>}

      <div className={s.Cover}>
        <Image src={cover ?? defaultBookImage} alt="book image" fill className="object-cover" />
      </div>

      <div className={s.Booking}>
        <BookingForm />
      </div>

      <div className={s.QuickFacts}>
        <h3 className="text-lg font-semibold">Quick Facts</h3>
        <div className="md:flex md:gap-4">
          <div className="mt-2 flex items-center">
            <Icon name="pages" />
            <p className="text-sm">{numPages} pages</p>
          </div>

          <div className="mt-2 flex items-center">
            <Icon name="earth" />
            <p className="text-sm">{language}</p>
          </div>

          <div className="mt-2 flex items-center">
            <Icon name="time-line" />
            <p className="text-sm">{format(new Date(date), 'yyyy')}</p>
          </div>
        </div>
      </div>

      <div className={s.Description}>
        <h3 className="text-lg font-semibold">About this book</h3>
        <p className="text-sm font-light">{description}</p>
      </div>
    </div>
  )
}
