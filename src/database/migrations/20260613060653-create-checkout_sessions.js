'use strict'

const CHECKOUT_STATUS = [
  'created',
  'validated',
  'address_selected',
  'delivery_selected',
  'payment_pending',
  'completed',
  'expired'
]

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('checkout_sessions', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      cartId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      itemsSnapshot: {
        type: Sequelize.JSON,
        allowNull: false
      },
      subtotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      discount: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      couponCode: {
        type: Sequelize.STRING,
        allowNull: true
      },
      shippingAddressId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      billingAddressId: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM(CHECKOUT_STATUS),
        defaultValue: 'created',
        allowNull: true
      },
      moreDetails: {
        type: Sequelize.JSON,
        allowNull: true
      },
      idempotencyKey: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('checkout_sessions')
  }
}