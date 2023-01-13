import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export const IsDateValid = (validationOptions?: ValidationOptions): PropertyDecorator => (object, propertyName): void => {
  registerDecorator({
    name: 'IsDateValid',
    target: object.constructor,
    propertyName: propertyName.toString(),
    options: validationOptions,
    validator: {
      validate(value: unknown) {
        if (value instanceof Date) {
          const timestamp = value.getTime();
          return !Number.isNaN(timestamp);
        }
        return false;
      },
      defaultMessage: (args: ValidationArguments) => `Property ${args.property} is not valid date`,
    },
  });
};
