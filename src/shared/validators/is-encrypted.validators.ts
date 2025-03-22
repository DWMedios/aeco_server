import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { decryptStr } from '@shared/utils/crypto.utils'

@ValidatorConstraint({ async: false })
export class IsEncryptedConstraint implements ValidatorConstraintInterface {
  validate(text: string) {
    try {
      const decrypted = decryptStr(text)
      return !!decrypted
    } catch (error) {
      return false
    }
  }

  defaultMessage() {
    return 'validation.ENCRYPTED_INVALID'
  }
}

export function IsEncrypted(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isEncrypted',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEncryptedConstraint,
    })
  }
}
