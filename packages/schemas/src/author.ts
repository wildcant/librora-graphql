import z from 'zod'

export const AuthorSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type AuthorModel = z.infer<typeof AuthorSchema>
