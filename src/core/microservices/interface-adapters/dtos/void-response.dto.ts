// TODO: fixme
// eslint-disable-next-line import/no-cycle
import { IServiceVoidData } from '../interfaces';

export class VoidResponseDto implements IServiceVoidData {

  public message: string;
  public status: boolean;

  constructor(message?: string, status?: boolean) {
    this.message = message ?? 'EXECUTED';
    this.status = status ?? true;
  }

}
