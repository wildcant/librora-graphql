import { EAdminRole, ECountryCode, EUserRole, EUserType } from './enums'
import z from 'zod'

export const BaseUserSchema = z.object({
  id: z.string().uuid(),
  countryCode: z.nativeEnum(ECountryCode).optional(),
  email: z.string({ required_error: 'Email is required' }).email(),
  firstName: z.string({ required_error: 'First name is required' }).min(1).max(50),
  isEmailValidated: z.boolean().optional().default(false).nullish(),
  lastName: z.string({ required_error: 'Last name is required' }).min(1).max(50),
  password: z.string({ required_error: 'Password is required' }).min(5).max(50),
  requiresCookieConsent: z.boolean().default(true).nullish(),
  username: z.string({ required_error: 'Username is required' }).min(2).max(50),
  type: z.nativeEnum(EUserType),
})

export const UserSchema = BaseUserSchema.omit({
  type: true,
}).extend({
  type: z.literal(EUserType.User),
  role: z.nativeEnum(EUserRole),
})

export type UserModel = z.infer<typeof UserSchema>

export const PublicUserSchema = UserSchema.omit({ password: true })
export type PublicUserModel = z.infer<typeof PublicUserSchema>

export const AdminSchema = BaseUserSchema.omit({
  type: true,
}).extend({
  type: z.literal(EUserType.Admin),
  role: z.nativeEnum(EUserRole),
})

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

export const UserSchemaValidators = {
  role: UserSchema.refine(validateRoleMatchType),
}
