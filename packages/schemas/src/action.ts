import z from 'zod'

// There could be enums that we don't need to use in the schema.
// Therefore codegen won't generate those.
// TODO: Find a way to autogenerate those to avoid inconsistencies.
export enum EActionNamespace {
  UserFlow = 'USER_FLOW',
  ReservationFlow = 'RESERVATION_FLOW',
}

export enum EUserActionName {
  EmailConfirmation = 'EMAIL_CONFIRMATION',
  ResetPassword = 'RESET_PASSWORD',
}

export enum EReservationActionName {
  Booked = 'BOOKED',
  Approved = 'APPROVED',
}

export const ACTION_NAMES = [...Object.values(EUserActionName), ...Object.values(EReservationActionName)]

const ActionNamespaceSchema = z.union([
  z.discriminatedUnion('name', [
    z.object({
      namespace: z.literal(EActionNamespace.UserFlow),
      name: z.literal(EUserActionName.EmailConfirmation),
      metadata: z.object({ redeemed: z.boolean().default(false), expiresAt: z.date() }),
    }),
    z.object({
      namespace: z.literal(EActionNamespace.UserFlow),
      name: z.literal(EUserActionName.ResetPassword),
      metadata: z.object({ redeemed: z.boolean().default(false), expiresAt: z.date() }),
    }),
  ]),
  z.discriminatedUnion('name', [
    z.object({
      namespace: z.literal(EActionNamespace.ReservationFlow),
      name: z.literal(EReservationActionName.Booked),
      // metadata: z.object({}),
    }),
    z.object({
      namespace: z.literal(EActionNamespace.ReservationFlow),
      name: z.literal(EReservationActionName.Approved),
      // metadata: z.object({}),
    }),
  ]),
])

export const ActionSchema = z
  .object({
    id: z.string().uuid().optional(),
    user: z.string().uuid(),
  })
  .and(ActionNamespaceSchema)

export type ActionModel = z.infer<typeof ActionSchema>
