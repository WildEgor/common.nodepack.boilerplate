/**
 * Base model
 */
export abstract class MongooseModelBase {

  protected constructor(props?: unknown) {
    if (props) {
      Object.assign(this, props);
    }
  }

  /**
   * Virtual fields. id, createdAt and updatedAt supports by mongoose itself
   */
  id?: string;
  createdAt?: Date;
  updatedAt?: Date;

  /**
   * Need assign custom get/set at schema
   */
  isDeleted?: boolean;
  deletedAt?: Date;

  /**
   * Model fields
   */
  is_deleted?: boolean;
  deleted_at?: Date;
  created_at?: Date;
  updated_at?: Date;

}
