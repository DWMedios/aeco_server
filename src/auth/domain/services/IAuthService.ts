import type { LoginUserDto } from '../dto/LoginUser.dto'

export const AUTH_SERVICE = Symbol('IAuthService')

export interface IAuthService {
  run(login: LoginUserDto): Promise<{ access_token: string }>
}
