import sgMail from '@sendgrid/mail'
import { env } from '../env'

const from = env.EMAIL_FROM
const replyTo = env.EMAIL_REPLY_TO

const templates = {
  EMAIL_CONFIRMATION: 'd-f1c59d6c0fb64584830db79861ce5068',
  RESET_PASSWORD: 'd-13dc1cbc47b046dd975c6e8f145c5708 ',
}

interface EmailConfirmationTemplateData {}
export async function sendEmailConfirmation(
  userEmail: string,
  dynamicTemplateData: EmailConfirmationTemplateData
) {
  try {
    return sgMail.send({
      from,
      replyTo,
      to: userEmail,
      templateId: templates.EMAIL_CONFIRMATION,
      dynamicTemplateData,
    })
  } catch (error) {
    console.error(error)
  }
}

interface PasswordInstructionsTemplateData {
  token: string
}
export async function sendPasswordInstructions(
  userEmail: string,
  dynamicTemplateData: PasswordInstructionsTemplateData
) {
  try {
    await sgMail.send({
      from,
      replyTo,
      to: userEmail,
      templateId: templates.RESET_PASSWORD,
      dynamicTemplateData,
    })
  } catch (error) {
    console.error(error)
  }
}
