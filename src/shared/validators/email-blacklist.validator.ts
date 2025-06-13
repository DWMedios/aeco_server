import * as fs from 'fs'
import * as path from 'path'
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

const blackListPath = path.join(__dirname, 'blacklist.json')
const blackListObject = JSON.parse(fs.readFileSync(blackListPath, 'utf8'))

@ValidatorConstraint({ async: false })
export class IsNotInBlacklistConstraint
  implements ValidatorConstraintInterface
{
  validate(email: string): boolean {
    if (process.env.NODE_ENV === 'development') return true

    const emailParse = email.trim().toLowerCase()
    const emailDomain = emailParse.split('@')[1]
    const blackList = blackListObject.blacklist
    return !blackList.includes(emailDomain)
  }

  defaultMessage(): string {
    return 'El dominio del correo electrónico no es válido'
  }
}

export function IsNotInBlacklist(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isNotInBlacklist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsNotInBlacklistConstraint,
    })
  }
}
