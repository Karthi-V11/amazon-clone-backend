import { DataTypes } from 'sequelize'
import ModelBase from './base.model'

export default class SubCategory extends ModelBase {
  static model = 'subCategory'
  static table = 'sub_categories'

  static options = {
    name: {
      singular: 'subCategory',
      plural: 'subCategories'
    }
  }

  static attributes = {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
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
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
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
    // Belongs to Category (the parent)
    SubCategory.belongsTo(models.Category, { foreignKey: 'parentId', as: 'category' })
    // A sub‑category can have many products
    SubCategory.hasMany(models.Product, { foreignKey: 'subCategoryId', as: 'products' })
  }
}
