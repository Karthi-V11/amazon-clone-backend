import { DataTypes } from 'sequelize';
import ModelBase from './base.model';

export default class CartItem extends ModelBase {
  static model = 'cartItem';
  static table = 'cart_items';

  static options = {
    name: {
      singular: 'cartItem',
      plural: 'cartItems',
    },
  }

  static attributes = {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    cartId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
      validate: { min: 1 },
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
    CartItem.belongsTo(models.Cart, { foreignKey: 'cartId', as: 'cart' });
    CartItem.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' });
  }
}
