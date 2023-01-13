import { Transform } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class TestIntegerDto {

  @Transform((p) => +p.value)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsPositive()
  public id!: number;

}
