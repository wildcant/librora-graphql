import { cleanEnv, str, num, bool } from 'envalid'
import * as dotenv from 'dotenv'
dotenv.config()

export const env = cleanEnv(process.env, {
  SENDGRID_API_KEY: str(),
  EMAIL_FROM: str(),
  EMAIL_REPLY_TO: str(),
  DATABASE_HOST: str(),
  DATABASE_PORT: num(),
  DATABASE_NAME: str(),
  DATABASE_USERNAME: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_SSL: bool(),
})
