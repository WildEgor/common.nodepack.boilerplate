import { IUnitOfWorkPort, ServiceResponseDtoBase } from '../../../../core/microservices';

export class MockUnitOfWork implements IUnitOfWorkPort {

  async execute<T>(
    correlationId: string,
    callback: () => Promise<T>,
  ): Promise<T> {
    if (!correlationId) {
      throw new Error('Correlation ID must be provided');
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let result: T | ServiceResponseDtoBase<T> = null;
    // eslint-disable-next-line no-useless-catch
    try {
      // eslint-disable-next-line callback-return
      result = await callback();
      if (
        ServiceResponseDtoBase.isError(
          result as unknown as ServiceResponseDtoBase<T>,
        )
      ) {
        return result;
      }
    }
    catch (error) {
      throw error;
    }

    return result;
  }

}
