import { registerAs } from '@nestjs/config'

export default registerAs('postmark', () => ({
  api_key: process.env.POSTMARK_API_KEY ?? '',
  from: process.env.POSTMARK_FROM ?? '',
  templates: {
    email_verification: process.env.POSTMARK_EMAIL_VERIFICATION_TEMPLATE ?? '',
    password_reset: process.env.POSTMARK_PASSWORD_RESET_TEMPLATE ?? '',
  },
}))
