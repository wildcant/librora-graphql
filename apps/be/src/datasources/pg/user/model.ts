export enum EUserType {
  ADMIN,
  USER,
}
export enum EUserRole {
  LENDER_BORROWER,
  VISITOR,
}
export enum EAdminRole {
  SUPER,
}
export enum ECountryCode {
  CO,
}

export interface UserModel {
  id: string
  countryCode: ECountryCode
  email: string
  firstName: string
  isEmailValidated: boolean
  lastName: string
  password: string
  publishedBooks?: string[]
  requiresCookieConsent: boolean
  role: EUserRole | EAdminRole
  type: EUserType
}
