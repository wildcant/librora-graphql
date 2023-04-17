import z from 'zod'
import { EAdminRole, EUserRole, EUserType } from 'graph/enums'

export const BaseUserSchema = z.object({
  id: z.string().uuid(),
  email: z.string({ required_error: 'Email is required' }).email(),
  firstName: z.string({ required_error: 'First name is required' }).min(1).max(50),
  isEmailValidated: z.boolean().optional().default(false).nullish(),
  lastName: z.string({ required_error: 'Last name is required' }).min(1).max(50),
  password: z.string({ required_error: 'Password is required' }).min(5).max(50),
  requiresCookieConsent: z.boolean().default(true).nullish(),
  username: z.string({ required_error: 'Username is required' }).min(2).max(50),
  type: z.nativeEnum(EUserType),
  location: z.string().uuid().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export const UserSchema = BaseUserSchema.omit({
  type: true,
}).extend({
  type: z.literal(EUserType.USER),
  role: z.nativeEnum(EUserRole),
})

export type UserModel = z.infer<typeof UserSchema>

export const PublicUserSchema = UserSchema.omit({ password: true })
export type PublicUserModel = z.infer<typeof PublicUserSchema>

export const AdminSchema = BaseUserSchema.omit({
  type: true,
}).extend({
  type: z.literal(EUserType.ADMIN),
  role: z.nativeEnum(EUserRole),
})

function validateRoleMatchType(val: { role: EUserRole | EAdminRole; type: EUserType }) {
  switch (val.type) {
    case EUserType.ADMIN:
      return z.nativeEnum(EAdminRole).parse(val.role)
    case EUserType.USER:
      return z.nativeEnum(EUserRole).parse(val.role)
    default:
      return false
  }
}

export const UserSchemaValidators = {
  default: UserSchema.partial({ id: true }),
  role: UserSchema.refine(validateRoleMatchType),
}
