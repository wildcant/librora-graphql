import z from 'zod'

export const TopicSchema = z.object({
  id: z.string().uuid(),
  name: z.string({ required_error: 'Name is required' }).min(1).max(50),
  colorCode: z.string().optional(),
  uniquerUrl: z.string().optional(),
})

export type TopicModel = z.infer<typeof TopicSchema>

export const TopicSchemaValidators = {
  default: TopicSchema.partial({ id: true }),
}
