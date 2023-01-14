// eslint-disable-next-line max-classes-per-file
import { ApiProperty } from '@nestjs/swagger';
import { IServiceVoidData } from '../../../../core/microservices';

export class UnavailableServiceResponseDto implements IServiceVoidData {

  @ApiProperty()
    message!: string;

  @ApiProperty()
    code!: string;

  @ApiProperty()
    serviceName!: string;

  @ApiProperty({
    default: false,
  })
    status!: boolean;

}

export class UnavailableServiceResponseDoc {

  @ApiProperty({
    type: UnavailableServiceResponseDto,
  })
    data!: UnavailableServiceResponseDto;

  @ApiProperty({
    default: false,
  })
    isOk!: boolean;

}
