import sgMail from '@sendgrid/mail'
import { env } from 'env'

const from = env.EMAIL_FROM
const replyTo = env.EMAIL_REPLY_TO

const templates = {
  EMAIL_CONFIRMATION: 'd-f1c59d6c0fb64584830db79861ce5068',
  RESET_PASSWORD: 'd-13dc1cbc47b046dd975c6e8f145c5708',
}

export async function sendEmailConfirmation(userEmail: string, templateData: { token: string }) {
  try {
    await sgMail.send({
      from,
      replyTo,
      to: userEmail,
      templateId: templates.EMAIL_CONFIRMATION,
      dynamicTemplateData: {
        confirmEmailUrl: `${env.WEB_APP_URL}/email-verification?token=${templateData.token}`,
      },
    })
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export async function sendPasswordInstructions(
  userEmail: string,
  templateData: { token: string; userFirstName: string }
) {
  try {
    await sgMail.send({
      from,
      replyTo,
      to: userEmail,
      templateId: templates.RESET_PASSWORD,
      dynamicTemplateData: {
        resetPasswordUrl: `${env.WEB_APP_URL}/reset-password?token=${templateData.token}`,
        userFirstName: capitalize(templateData.userFirstName),
      },
    })
  } catch (error) {
    console.error(JSON.stringify(error))
  }
}
