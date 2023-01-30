import { cleanEnv, str } from 'envalid'
import * as dotenv from 'dotenv'
dotenv.config()

export const env = cleanEnv(process.env, {
  SENDGRID_API_KEY: str(),
  EMAIL_FROM: str(),
  EMAIL_REPLY_TO: str(),
})
