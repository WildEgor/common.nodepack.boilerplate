import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';
import { Types } from 'mongoose';

export const IsObjectId = (validationOptions?: ValidationOptions): PropertyDecorator => (object, propertyName): void => {
  registerDecorator({
    name: 'IsObjectId',
    target: object.constructor,
    propertyName: propertyName.toString(),
    options: validationOptions,
    validator: {
      validate(value: unknown) {
        if (value instanceof Types.ObjectId) {
          return true;
        }
        if (typeof value === 'string' && value.length > 0) {
          return Types.ObjectId.isValid(value);
        }
        return false;
      },
      defaultMessage: (args: ValidationArguments) => `Property ${args.property} is not object id`,
    },
  });
};
