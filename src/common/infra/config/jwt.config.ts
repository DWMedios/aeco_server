import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
  exp_int: process.env.AUTH_EXPINT ?? 12,
  time_str: process.env.AUTH_TIME_STR ?? 'hours',
  secret: process.env.AUTH_SECRET ?? '',
  secret_reset_password: process.env.AUTH_SECRET_RESET_PASSWORD ?? '',
  secret_verify_email: process.env.AUTH_SECRET_VERIFY_EMAIL ?? '',
}))
