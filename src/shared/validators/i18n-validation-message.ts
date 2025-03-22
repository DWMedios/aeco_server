import { ValidationArguments } from 'class-validator'

export const I18nValidationMessage = (key: string) => {
  return (validationArguments?: ValidationArguments) => {
    return `${key}|${JSON.stringify({
      property: validationArguments?.property,
      value: validationArguments?.value,
      constraints: validationArguments?.constraints,
    })}`
  }
}
