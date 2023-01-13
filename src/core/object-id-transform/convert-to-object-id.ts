import mongoose, { Types } from 'mongoose';

export const ArrayObjectIdConvert = (value: string[]): Types.ObjectId[] | null => {
  try {
    if (Array.isArray(value)) {
      return value.map((item) => new mongoose.Types.ObjectId(item));
    }
    return null;
  }
  catch (error) {
    return null;
  }
};

export const StringObjectIdConvert = (value: string): Types.ObjectId | null => {
  if (mongoose.isObjectIdOrHexString(value)) {
    return new mongoose.Types.ObjectId(value);
  }
  return null;
};
