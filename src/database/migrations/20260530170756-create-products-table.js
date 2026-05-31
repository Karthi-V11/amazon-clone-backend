'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      compareAtPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      stockQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      inStack: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      categoryId: {
        type: Sequelize.BIGINT,
        allowNull: false,
      },
      subCategoryId: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      brand: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      averageRating: {
        type: Sequelize.DECIMAL(2, 1),
        defaultValue: 0,
      },
      reviewCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      created_at: { 
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: { 
        type: Sequelize.DATE,
        allowNull: false,
      }
    });

    await queryInterface.addIndex('products', ['slug'], {
      unique: true,
      name: 'products_slug_unique_idx',
    });

    await queryInterface.addIndex('products', ['category_id'], {
      name: 'products_category_id_idx',
    });

    await queryInterface.addIndex('products', ['sub_category_id'], {
      name: 'products_sub_category_id_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  },
}