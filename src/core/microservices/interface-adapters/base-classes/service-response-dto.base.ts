export class ServiceResponseDtoBase<T> {

  public data: T;
  public statusCode: number;

  constructor(data: T, statusCode: number) {
    this.data = data;
    this.statusCode = statusCode;
  }

  public static isError<T>(response: ServiceResponseDtoBase<T>): boolean {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return response?.statusCode >= 400;
  }

}
