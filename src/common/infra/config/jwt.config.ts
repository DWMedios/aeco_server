import { registerAs } from '@nestjs/config'

export default registerAs('jwt', () => ({
  expInt: process.env.AUTH_EXPINT ?? 12,
  timeStr: process.env.AUTH_TIME_STR ?? 'hours',
  secret: process.env.AUTH_SECRET ?? '',
  secretForgotPassword: process.env.AUTH_SECRET_FORGOT_PASSWORD ?? '',
  secretInvite: process.env.AUTH_SECRET_INVITE ?? '',
}))
