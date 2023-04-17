Zod limitations found:

1. First user schema definition with limitations:
   Can't use zod object methods for intersections or unions :/
   See https://github.com/colinhacks/zod/issues/56

```ts
export const UserSchema = z
  .object({
    id: z.string().optional(),
    countryCode: z.nativeEnum(ECountryCode).optional(),
    email: z.string({ required_error: 'Email is required' }).email(),
    firstName: z.string({ required_error: 'First name is required' }).min(1).max(50),
    isEmailValidated: z.boolean().optional().default(false).nullish(),
    lastName: z.string({ required_error: 'Last name is required' }).min(1).max(50),
    password: z.string({ required_error: 'Password is required' }).min(5).max(50),
    requiresCookieConsent: z.boolean().default(true).nullish(),
    username: z.string({ required_error: 'Username is required' }).min(2).max(50),
  })
  .and(
    z.discriminatedUnion('type', [
      z.object({
        type: z.literal(EUserType.User),
        role: z.nativeEnum(EUserRole),
      }),
      z.object({
        type: z.literal(EUserType.Admin),
        role: z.nativeEnum(EAdminRole),
      }),
    ])
  )
```

2. First attempt to manage conditional validation https://github.com/colinhacks/zod/issues/61

```ts
// No simple conditional validation :(
function validateRoleMatchType(val: { role: EUserRole | EAdminRole; type: EUserType }) {
  switch (val.type) {
    case EUserType.Admin:
      return z.nativeEnum(EAdminRole).parse(val.role)
    case EUserType.User:
      return z.nativeEnum(EUserRole).parse(val.role)
    default:
      return false
  }
}
```

3. As zod union, zod effect doesn't have the useful zod object methods. https://github.com/colinhacks/zod/issues/1245 and https://github.com/colinhacks/zod/pull/1845

```ts
// pick | omit | merge won't work with refine, it's returning a `zod effect`.
// therefore we need extra schemas for more complex validations.
export const UserSchemaValidators = UserSchema.refine(validateRoleMatchType)
```

4. nesting/merging discriminated union. Waiting for https://github.com/colinhacks/zod/pull/1589

```ts
// This is the type we want to accomplish
type UserAction = {
  namespace: EActionNamespace.UserFlow
} & (
  | {
      name: EUserActionName.EmailConfirmation
      metadata: { token: string }
    }
  | {
      name: EUserActionName.ResetPassword
      metadata: { userName: string }
    }
)

type ReservationAction = {
  namespace: EActionNamespace.ReservationFlow
} & (
  | {
      name: EReservationActionName.Booked
      metadata: { token: string }
    }
  | {
      name: EReservationActionName.Approved
      metadata: { userName: string }
    }
)

type Action = UserAction | ReservationAction

export const UserActionNameSchema = z.discriminatedUnion('name', [
  z.object({
    name: z.literal(EUserActionName.EmailConfirmation),
    metadata: z.object({ token: z.string() }),
  }),
  z.object({
    name: z.literal(EUserActionName.ResetPassword),
    metadata: z.object({ userName: z.string() }),
  }),
])

const ReservationActionNameSchema = z.discriminatedUnion('name', [
  z.object({
    name: z.literal(EReservationActionName.Booked),
    metadata: z.object({ token: z.string() }),
  }),
  z.object({
    name: z.literal(EReservationActionName.Approved),
    metadata: z.object({ userName: z.string() }),
  }),
])

// Not able to merge discriminated union :/
const ActionNamespaceSchemaImproved = z.discriminatedUnion('namespace', [
  z.object({
    namespace: z.literal(EActionNamespace.UserFlow),
  }),
])
```
