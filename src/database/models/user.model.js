import { DataTypes } from 'sequelize'
import ModelBase from './base.model'
import { USER_GENDER } from '@src/utils/constants/public.constants.js'

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
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true
    },

    provider: {
      type: DataTypes.ENUM(
        "LOCAL",
        "GOOGLE"
      ),
      defaultValue: "LOCAL"
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
    User.hasMany(models.address, { foreignKey: 'userId', as: 'addresses' })
    User.hasOne(models.cart, { foreignKey: 'userId', as: 'cart' })
    User.hasMany(models.order, { foreignKey: 'userId', as: 'orders' })
    User.hasMany(models.checkout_session, { foreignKey: 'userId', as: 'checkoutSessions' })
  }
}
