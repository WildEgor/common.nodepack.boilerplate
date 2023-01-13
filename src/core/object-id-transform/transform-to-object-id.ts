import { TransformFnParams } from 'class-transformer';
import { Types } from 'mongoose';
import { ArrayObjectIdConvert, StringObjectIdConvert } from './convert-to-object-id';

export const ArrayObjectIdTransformer = (params: TransformFnParams): Types.ObjectId[] | null => ArrayObjectIdConvert(params.value);
export const StringObjectIdTransformer = (params: TransformFnParams): Types.ObjectId | null => StringObjectIdConvert(params.value);
