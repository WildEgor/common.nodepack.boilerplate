import { Field, ObjectType } from '@nestjs/graphql';
import { IPongRes } from '../../interfaces/sample/pong.interface';

@ObjectType()
export class PongResDto implements IPongRes {

  @Field()
    pong!: boolean;

}
