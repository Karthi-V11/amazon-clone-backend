import { DataTypes } from 'sequelize';
import ModelBase from './base.model';

export default class Order extends ModelBase {
    static model = 'order';
    static table = 'orders';

    static options = {
        name: {
            singular: 'order',
            plural: 'orders',
        },
    };

    static attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        shippingAddressId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: { model: 'addresses', key: 'id' },
        },
        billingAddressId: {
            type: DataTypes.STRING,
            allowNull: false,
            references: { model: 'addresses', key: 'id' },
        },
        totalAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        status: {
            // type: DataTypes.ENUM(
            //     'pending',
            //     'processing',
            //     'shipped',
            //     'delivered',
            //     'cancelled'
            // ),
            type: DataTypes.STRING,
            defaultValue: 'pending',
            allowNull: true,
        },
        paymentMethod: {
            // type: DataTypes.ENUM('card', 'paypal', 'cod', 'applepay'),
            type: DataTypes.STRING,
            allowNull: true,
        },
        metadata: {
            type: DataTypes.JSONB,
            allowNull: true,
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
        Order.belongsTo(models.user, { foreignKey: 'userId', as: 'user' })
        Order.belongsTo(models.address, { foreignKey: 'shippingAddressId', as: 'shippingAddress', })
        Order.belongsTo(models.address, { foreignKey: 'billingAddressId', as: 'billingAddress', })
        Order.hasMany(models.orderItem, { foreignKey: 'orderId', as: 'items', })
        Order.belongsTo(models.coupon, { foreignKey: 'couponId', as: 'coupon' })
    }
}
