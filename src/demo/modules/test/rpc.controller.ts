import {Controller, Logger} from "@nestjs/common";
import {MessagePattern, Payload} from "@nestjs/microservices";
import {ExternalServiceErrorException} from "../../infrastructure/exceptions/service/test-service.exception";

@Controller()
export class RpcController {

  private readonly _logger = new Logger(RpcController.name);

  @MessagePattern('notifier.send-notification')
  public async test(@Payload() payload: unknown) {
    this._logger.debug('notifier.send-notification')
    throw new ExternalServiceErrorException('')
  }
}
