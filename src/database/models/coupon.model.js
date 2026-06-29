import { DataTypes } from 'sequelize'
import ModelBase from './base.model'

export default class Coupon extends ModelBase {
    static model = 'coupon'
    static table = 'coupons'

    static attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        code: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('percentage', 'flat'),
            allowNull: false
        },
        value: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        minOrderAmount: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 0
        },
        maxDiscount: {
            type: DataTypes.DECIMAL(10, 2)
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        expiryDate: {
            type: DataTypes.DATE
        },
        usageLimit: {
            type: DataTypes.INTEGER
        },
        usedCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        moreDetails: {
            type: DataTypes.JSON,
            allowNull: true
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
        Coupon.hasMany(models.checkout_session, { foreignKey: 'couponId', sourceKey: 'id', as: 'checkoutSessions' })
        Coupon.hasMany(models.order, { foreignKey: 'couponId', sourceKey: 'id', as: 'orders' })
    }
}