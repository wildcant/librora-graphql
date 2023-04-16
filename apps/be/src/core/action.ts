import isAfter from 'date-fns/isAfter'

export function validateResetPasswordAction(metadata: { redeemed: boolean; expiresAt: Date }): {
  message?: string
  valid: boolean
} {
  if (metadata.redeemed) {
    return { valid: false, message: 'Action redeemed' }
  }

  if (isAfter(new Date(), new Date(metadata.expiresAt))) {
    return { valid: false, message: 'Action expired' }
  }

  return { valid: true }
}
