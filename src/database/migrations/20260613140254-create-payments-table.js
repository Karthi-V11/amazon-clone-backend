'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      orderId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'orders',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      currency: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'INR'
      },
      gateway: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'razorpay'
      },
      gatewayOrderId: {
        type: Sequelize.STRING
      },
      gatewayPaymentId: {
        type: Sequelize.STRING
      },
      gatewaySignature: {
        type: Sequelize.TEXT
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending'
      },
      metadata: {
        type: Sequelize.JSONB
      },
      verifiedAt: {
        type: Sequelize.DATE
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

    await queryInterface.addIndex('payments', ['orderId'])
    await queryInterface.addIndex('payments', ['gatewayOrderId'])
    await queryInterface.addIndex('payments', ['gatewayPaymentId'])
    await queryInterface.addIndex('payments', ['status'])
  },

  async down(queryInterface) {
    await queryInterface.dropTable('payments')
  }
}