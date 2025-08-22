import { registerAs } from '@nestjs/config'

export default registerAs('config', () => ({
  port: process.env.PORT ?? 3001,
  node_env: process.env.NODE_ENV ?? 'development',
  crypto_key: process.env.CRYPTO_KEY ?? '',
  frontend_url: process.env.FRONTEND_URL ?? 'http://localhost:3000',
}))
