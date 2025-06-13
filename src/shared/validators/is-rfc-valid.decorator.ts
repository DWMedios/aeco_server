import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

@ValidatorConstraint({ async: false })
export class IsRFCValidConstraint implements ValidatorConstraintInterface {
  private readonly RFC_REGEX_1 =
    /^(([A-ZÑ&]{3})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][0-9])|[3][01])([A-Z0-9]{3}))|(([A-ZÑ&]{3})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][0-9])|[3][0])([A-Z0-9]{3}))|(([A-ZÑ&]{3})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][0-9])([A-Z0-9]{3}))|(([A-ZÑ&]{3})([0-9]{2})[0][2]([01][1-9]|[2][0-8])([A-Z0-9]{3}))$/
  private readonly RFC_REGEX_2 =
    /^(([A-ZÑ&]{4})([0-9]{2})([0][13578]|[1][02])(([0][1-9]|[12][0-9])|[3][01])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([0-9]{2})([0][13456789]|[1][012])(([0][1-9]|[12][0-9])|[3][0])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([02468][048]|[13579][26])[0][2]([0][1-9]|[12][0-9])([A-Z0-9]{3}))|(([A-ZÑ&]{4})([0-9]{2})[0][2]([01][1-9]|[2][0-8])([A-Z0-9]{3}))$/

  validate(rfc: string): boolean {
    return this.RFC_REGEX_1.test(rfc) || this.RFC_REGEX_2.test(rfc)
  }

  defaultMessage(): string {
    return 'El RFC no es válido'
  }
}

export function IsRFCValid(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isRFCValid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsRFCValidConstraint,
    })
  }
}
