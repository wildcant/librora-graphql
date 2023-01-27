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
  email: z.string({ required_error: 'Enter your email' }),
  firstName: z.string({ required_error: 'Enter your first name' }),
  isEmailValidated: z.boolean().optional().default(false).nullish(),
  lastName: z.string({ required_error: 'Enter your last name' }),
  password: z.string({ required_error: 'Enter a password' }),
  requiresCookieConsent: z.boolean().default(true).nullish(),
  role: z.union([z.nativeEnum(EUserRole), z.nativeEnum(EAdminRole)]),
  type: z.nativeEnum(EUserType),
  username: z.string({ required_error: 'Enter a username' }),
})
// .refine(validateRoleMatchType)
// UserSchema.pick doesn't work with refine :(
// const a = UserSchema.pick({})

export type UserModel = z.infer<typeof UserSchema>
