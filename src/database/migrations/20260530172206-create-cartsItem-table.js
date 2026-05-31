'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      cartId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'carts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      productId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'products', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 1,
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

    await queryInterface.addIndex('cart_items', ['cart_id'], {
      name: 'cart_items_cart_id_idx',
    });

    await queryInterface.addIndex('cart_items', ['product_id'], {
      name: 'cart_items_product_id_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_items');
  },
};