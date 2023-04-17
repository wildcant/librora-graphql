import z from 'zod'

export const LocationSchema = z.object({
  id: z.string().uuid(),
  country: z.string(),
  city: z.string(),
  zipcode: z.string(),

  // countryCode: z.nativeEnum(ECountryCode).optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type LocationModel = z.infer<typeof LocationSchema>
