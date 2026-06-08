import { DataTypes } from 'sequelize';
import ModelBase from './base.model';

export default class OrderItem extends ModelBase {
  static model = 'orderItem';
  static table = 'order_items';

  static options = {
    name: {
      singular: 'orderItem',
      plural: 'orderItems',
    },
  };

  static attributes = {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    productId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: { min: 1 },
    },
    priceAtPurchase: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    OrderItem.belongsTo(models.order, { foreignKey: 'orderId', as: 'order' });
    OrderItem.belongsTo(models.product, { foreignKey: 'productId', as: 'product' });
  }
}
