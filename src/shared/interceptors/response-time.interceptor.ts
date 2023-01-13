import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from '@nestjs/common';
import { now, since } from 'microseconds';
import { catchError, map, Observable, tap } from 'rxjs';
import { ServiceException, ServiceResponseDto } from '../../core/microservices';

@Injectable()
export class ResponseTimeInterceptor implements NestInterceptor {

  public intercept(_context: ExecutionContext, next: CallHandler): Observable<ServiceResponseDto<unknown>> {
    const requestStartDate: number = now();
    let requestDuration = 0;

    return next.handle().pipe(
      tap(() => {
        requestDuration = since(requestStartDate);
      }),
      map((response) => {
        Object.assign(response, {
          reqTime: this.reqTimeString(requestDuration),
        });
        return response;
      }),
      catchError((exception: HttpException & ServiceException & Error) => {
        requestDuration = since(requestStartDate);

        Object.assign(exception, {
          reqTime: this.reqTimeString(requestDuration),
        });

        throw exception;
      }),
    );
  }

  private reqTimeString(value: number): string {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return `${Math.ceil(value / 1000)}.${String(value).slice(-3)}ms`;
  }

}
