import { Document } from 'mongoose';

/**
 * Default document
 */
export interface IDefaultDocument extends Document {
  id: string;
  is_deleted: boolean;
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
}
