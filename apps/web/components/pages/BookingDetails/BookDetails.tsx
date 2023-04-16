import { BookBySlugQuery } from '@librora/api/schema'
import format from 'date-fns/format'
import isSameMonth from 'date-fns/isSameMonth'
import isSameDay from 'date-fns/isSameDay'
import differenceInDays from 'date-fns/differenceInDays'
import Image from 'next/image'
import { useState } from 'react'
import { Button, Icon, Link, RangeCalendar, RangeValue } from 'ui'
import s from './BookDetails.module.css'
import dynamic from 'next/dynamic'

const Location = dynamic(() => import('./Location'), {
  ssr: false,
})

// TODO: Add default image.
const defaultBookImage = ''

function BookingForm() {
  const [dateRange, setDateRange] = useState<RangeValue<Date>>()
  let label
  let title = 'When do you want to have it'

  if (dateRange) {
    const { start, end } = dateRange
    const startDate = format(start, 'MMM dd')
    const endDateIsSameMonth = isSameMonth(start, end)
    const endDate = format(end, endDateIsSameMonth ? 'dd' : 'MMM dd')
    label = `${startDate} - ${endDate}`

    if (isSameDay(start, end)) {
      title = 'You have the for one day'
    } else {
      const numberOfDays = differenceInDays(end, start)
      title = `${numberOfDays} day${numberOfDays > 1 ? 's' : ''} with the book`
    }
  }

  return (
    <div>
      <h3 className={s.Subtitle}>{title}</h3>
      {label ? <p className="text-lg font-light">{label}</p> : <></>}
      <div className="flex flex-col ">
        <div className="self-center">
          <RangeCalendar onChange={setDateRange} value={dateRange} />
        </div>
        <div className="hidden sm:block sm:self-end">
          <Button size="md" className="w-48">
            Reserve
          </Button>
        </div>
      </div>
    </div>
  )
}

type BookingDetailsProps = NonNullable<BookBySlugQuery['book']>

export function BookingDetails({
  title,
  author,
  cover,
  numPages,
  language,
  description,
  date,
  owner,
}: BookingDetailsProps) {
  return (
    <div className={s.Container}>
      <h1 className={s.Title}>{title}</h1>

      {author && <p className={s.Author}>{author.name}</p>}

      <div className={s.Cover}>
        <Image src={cover ?? defaultBookImage} alt="book image" fill className="rounded-2xl object-cover" />
      </div>

      <div className={s.Booking}>
        <BookingForm />
      </div>

      <div className={s.QuickFacts}>
        <h3 className={s.Subtitle}>Quick Facts</h3>
        <div>
          <div className="mt-2 flex items-center gap-2">
            <Icon name="pages" />
            <p className="text-md">Number of pages: {numPages}</p>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Icon name="earth" />
            <p className="text-md">Language: {language}</p>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <Icon name="time-line" />
            <p className="text-md">Published at {format(new Date(date), 'yyyy')}</p>
          </div>
        </div>
      </div>

      <div className={s.Description}>
        <h3 className={s.Subtitle}>About this book</h3>
        <p className="text-md font-light">{description}</p>
      </div>

      <div className={s.OwnerInfo}>
        <h3 className={s.Subtitle}>Lent by {owner.name}</h3>
        <span className="text-lg font-light">Joined in {format(new Date(owner.createdAt), 'MMMM yyyy')}</span>

        {/* TODO: Add link to contact book owner */}
        <Link href={`#`} variant="button-outline" size="md" className="mt-4">
          Contact Owner
        </Link>
      </div>

      {owner.location ? (
        <div className={s.Location}>
          <h3 className={s.Subtitle}>You&apos;ll meet in</h3>
          <p className="text-lg font-light">
            {owner.location.city}, {owner.location.country}
          </p>
          <Location {...owner.location} />
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
