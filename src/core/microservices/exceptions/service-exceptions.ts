// eslint-disable-next-line max-classes-per-file
import { ServiceException } from './base-classes';

abstract class HttpAuthenticationException extends ServiceException {

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  public readonly statusCode = 401;

}

abstract class HttpConflictException extends ServiceException {

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  public readonly statusCode = 409;

}

abstract class HttpNotAllowedException extends ServiceException {

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  public readonly statusCode = 403;

}

abstract class HttpNotFoundException extends ServiceException {

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  public readonly statusCode = 404;

}

abstract class HttpClientException extends ServiceException {

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  public readonly statusCode = 400;

}

abstract class HttpServerException extends ServiceException {

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  public readonly statusCode = 500;

}

export {
  HttpServerException,
  HttpClientException,
  HttpNotFoundException,
  HttpNotAllowedException,
  HttpConflictException,
  HttpAuthenticationException,
};
