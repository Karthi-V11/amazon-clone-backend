import { DataTypes } from 'sequelize'
import ModelBase from './base.model'

export default class CheckoutSession extends ModelBase {
    static model = 'checkout_session'
    static table = 'checkout_sessions'

    static attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        cartId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        itemsSnapshot: {
            type: DataTypes.JSON,
            allowNull: false
        },
        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        discount: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        couponCode: {
            type: DataTypes.STRING
        },
        shippingAddressId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        billingAddressId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'created'
        },
        moreDetails: {
            type: DataTypes.JSON,
            allowNull: true
        },
        idempotencyKey: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        couponId: {
            type: DataTypes.BIGINT,
            allowNull: true,
            references: {
                model: 'coupons',
                key: 'id'
            }
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false
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
        CheckoutSession.belongsTo(models.user, { foreignKey: 'userId', as: 'user' })
        CheckoutSession.belongsTo(models.cart, { foreignKey: 'cartId', as: 'cart' })
        CheckoutSession.belongsTo(models.address, { foreignKey: 'shippingAddressId', as: 'shippingAddress' })
        CheckoutSession.belongsTo(models.address, { foreignKey: 'billingAddressId', as: 'billingAddress' })
        CheckoutSession.belongsTo(models.coupon, { foreignKey: 'couponId', as: 'coupon' })
    }
}