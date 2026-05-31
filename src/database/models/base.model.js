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
    super.init(this.attributes, {
      sequelize,
      modelName: this.model,
      tableName: this.table,
      underscored: true,
      schema: this.schema,
      timestamps: this.timestamps,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      indexes: this.indexes
    })
  }

  static associate() { }
}
