import { DataTypes } from 'sequelize';
import ModelBase from './base.model';

export default class Product extends ModelBase {
    static model = 'product';
    static table = 'products';

    static options = {
        name: {
            singular: 'product',
            plural: 'products',
        },
    }

    static indexes = [
        {
            unique: true,
            fields: ['slug']
        },
        {
            fields: ['category_id']
        },
        {
            fields: ['sub_category_id']
        }
    ]

    static attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        compareAtPrice: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true
        },
        stockQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        inStack: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        categoryId: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        subCategoryId: {
            type: DataTypes.BIGINT,
            allowNull: true,
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: false
        },
        averageRating: {
            type: DataTypes.DECIMAL(2, 1),
            defaultValue: 0
        },
        reviewCount: {
            type: DataTypes.INTEGER,
            defaultValue: 0
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
        Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' })
        Product.belongsTo(models.SubCategory, { foreignKey: 'subCategoryId', as: 'subCategory' })
        Product.hasMany(models.CartItem, { foreignKey: 'productId', as: 'cartItems' })
        Product.hasMany(models.OrderItem, { foreignKey: 'productId', as: 'orderItems' })
    }
}
