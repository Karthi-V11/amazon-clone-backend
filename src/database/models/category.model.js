import { DataTypes } from 'sequelize'
import ModelBase from './base.model'

export default class Category extends ModelBase {
    static model = 'category'
    static table = 'categories'

    static options = {
        name: {
            singular: 'category',
            plural: 'categories'
        }
    }

    static attributes = {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        parentId: {
            type: DataTypes.UUID,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
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
        Category.hasMany(models.subCategory, { foreignKey: 'parentId', as: 'subcategories' });
        Category.hasMany(models.Product, { foreignKey: 'categoryId', as: 'products' });
    }
}