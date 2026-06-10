import { DataTypes } from 'sequelize'
import ModelBase from './base.model'

export default class Review extends ModelBase {
    static model = 'review'
    static table = 'reviews'

    static options = {
        name: {
            singular: 'review',
            plural: 'reviews'
        }
    }

    static indexes = [
        {
            fields: ['productId']
        },
        {
            fields: ['userId']
        },
        {
            fields: ['rating']
        },
        {
            unique: true,
            fields: ['productId', 'userId']
        }
    ]

    static attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        productId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        userId: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },

        title: {
            type: DataTypes.STRING,
            allowNull: true
        },

        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        images: {
            type: DataTypes.JSONB,
            allowNull: false,
            defaultValue: []
        },

        helpfulCount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        verifiedPurchase: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }

    static associate(models) {
        Review.belongsTo(models.user, { foreignKey: 'userId', as: 'user' })
        Review.belongsTo(models.product, { foreignKey: 'productId', as: 'product' })
    }
}