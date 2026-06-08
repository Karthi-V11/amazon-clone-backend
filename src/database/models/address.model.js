import { DataTypes } from 'sequelize'
import ModelBase from './base.model'

export default class Address extends ModelBase {
  static model = 'address'
  static table = 'addresses'

  static options = {
    name: {
      singular: 'address',
      plural: 'addresses'
    }
  }

  static attributes = {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isDefault: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }

  static associate(models) {
    console.log(models)
    console.log('models.user =', models.user)
    console.log('models.order =', models.order)
    // An address belongs to a user
    Address.belongsTo(models.user, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' })
    // Can be used as shipping or billing address for many orders
    Address.hasMany(models.order, { foreignKey: 'shippingAddressId', as: 'shippingOrders' })
    Address.hasMany(models.order, { foreignKey: 'billingAddressId', as: 'billingOrders' })
  }
}
