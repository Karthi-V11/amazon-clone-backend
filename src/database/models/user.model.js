import { DataTypes } from 'sequelize'
import ModelBase from './base.model'

export default class User extends ModelBase {
  static model = 'user'
  static table = 'users'

  static options = {
    name: {
      singular: 'user',
      plural: 'users'
    }
  }

  static indexes = [
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['user_name']
    },
    {
      unique: true,
      fields: ['unique_id']
    }
  ]

  static attributes = {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    uniqueId: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    gender: {
      type: DataTypes.ENUM(Object.values(USER_GENDER)),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }

  static associate(models) {
    // One user can have many addresses
    User.hasMany(models.Address, { foreignKey: 'userId', as: 'addresses' });
    // One user has one active cart
    User.hasOne(models.Cart, { foreignKey: 'userId', as: 'cart' });
    // One user can have many orders
    User.hasMany(models.Order, { foreignKey: 'userId', as: 'orders' });
    // If you support third‑party sellers
    User.hasMany(models.Product, { foreignKey: 'sellerId', as: 'products' });
  }
}
