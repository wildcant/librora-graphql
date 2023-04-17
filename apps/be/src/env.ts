import { cleanEnv, str, num, bool } from 'envalid'
import * as dotenv from 'dotenv'
dotenv.config()

export const env = cleanEnv(process.env, {
  DATABASE_HOST: str(),
  DATABASE_NAME: str(),
  DATABASE_PASSWORD: str(),
  DATABASE_PORT: num(),
  DATABASE_SSL: bool(),
  DATABASE_USERNAME: str(),
  EMAIL_FROM: str(),
  EMAIL_REPLY_TO: str(),
  JWT_EXPIRATION: str({ devDefault: '24h' }),
  JWT_SECRET: str(),
  NODE_ENV: str(),
  PORT: num(),
  SENDGRID_API_KEY: str(),
  WEB_APP_URL: str(),
})
