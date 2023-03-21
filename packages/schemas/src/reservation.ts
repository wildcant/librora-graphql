import z from 'zod'
import { EReservationState } from './enums'

export const ReservationSchema = z.object({
  id: z.string().uuid(),
  startDate: z.date(),
  endDate: z.date(),
  state: z.nativeEnum(EReservationState),
  lender: z.string().uuid(),
  borrower: z.string().uuid(),
})
