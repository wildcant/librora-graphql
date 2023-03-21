import z from 'zod'
import { ECountryCode } from './enums'

export const LocationSchema = z.object({
  id: z.string().uuid(),
  countryCode: z.nativeEnum(ECountryCode).optional(),
  city: z.string(),
  zipcode: z.string(),
})
