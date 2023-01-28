import z from 'zod'
import { EAdminRole, ECountryCode, EUserRole, EUserType } from 'schemas/enums'

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

export const UserSchema = z.object({
  id: z.string().optional(),
  countryCode: z.nativeEnum(ECountryCode).optional(),
  email: z.string({ required_error: 'Enter your email' }).email(),
  firstName: z.string({ required_error: 'Enter your first name' }).min(2).max(50),
  isEmailValidated: z.boolean().optional().default(false).nullish(),
  lastName: z.string({ required_error: 'Enter your last name' }).min(2).max(50),
  password: z.string({ required_error: 'Enter a password' }).min(5).max(50),
  requiresCookieConsent: z.boolean().default(true).nullish(),
  role: z.union([z.nativeEnum(EUserRole), z.nativeEnum(EAdminRole)]),
  type: z.nativeEnum(EUserType),
  username: z.string({ required_error: 'Enter a username' }).min(2).max(50),
})
// .refine(validateRoleMatchType)
// UserSchema.pick doesn't work with refine :(
// const a = UserSchema.pick({})

export type UserModel = z.infer<typeof UserSchema>
