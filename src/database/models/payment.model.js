import { DataTypes } from 'sequelize'
import ModelBase from './base.model'

export default class Payment extends ModelBase {
    static model = 'payment'
    static table = 'payments'

    static options = {
        name: {
            singular: 'payment',
            plural: 'payments'
        }
    }

    static attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        orderId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'INR'
        },
        gateway: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'razorpay'
        },
        gatewayOrderId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gatewayPaymentId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gatewaySignature: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        },
        metadata: {
            type: DataTypes.JSONB,
            allowNull: true
        },
        verifiedAt: {
            type: DataTypes.DATE,
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
        Payment.belongsTo(models.order, { foreignKey: 'orderId', as: 'order' })
    }
}