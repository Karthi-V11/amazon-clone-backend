import { Model } from 'sequelize'

export default class ModelBase extends Model {
  
  static model
  static table
  static attributes
  static timestamps = true
  static indexes = []
  static dateKeys = ['createdAt', 'updatedAt']
  static options = {
    name: {
      singular: '',
      plural: ''
    }
  }

  static init(sequelize) {
    if (this.attributes.createdAt && typeof this.attributes.createdAt === 'object') {
      this.attributes.createdAt.field = 'created_at'
    }
    if (this.attributes.updatedAt && typeof this.attributes.updatedAt === 'object') {
      this.attributes.updatedAt.field = 'updated_at'
    }

    super.init(this.attributes, {
      sequelize,
      modelName: this.model,
      tableName: this.table,
      underscored: false,
      schema: typeof this.schema === 'string' ? this.schema : undefined,
      timestamps: this.timestamps,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      indexes: this.indexes
    })
  }

  static associate() { }
}
