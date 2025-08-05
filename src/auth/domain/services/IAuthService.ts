import type { LoginUserDto } from '../dto/login-user.dto'

export const AUTH_SERVICE = Symbol('IAuthService')

export interface IAuthService {
  run(login: LoginUserDto): Promise<{ access_token: string }>
}
