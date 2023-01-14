import { Field, ObjectType } from '@nestjs/graphql';
import { ISimpleRes } from '../../interfaces/sample/simple.interface';

@ObjectType()
export class SimpleResDto implements ISimpleRes {

  @Field({ nullable: true })
    message?: string;

}
