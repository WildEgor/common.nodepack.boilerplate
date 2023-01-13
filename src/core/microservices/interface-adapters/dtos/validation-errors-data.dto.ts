export class ValidationErrorDataDto {

  constraint: string;
  message: string;
  value: string;

  constructor(constraint: string, message?: string, value?: string) {
    this.constraint = constraint;
    this.message = message ?? '';
    this.value = value ?? '';
  }

}
