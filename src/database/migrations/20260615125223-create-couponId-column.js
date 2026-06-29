'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'orders',
      'couponId',
      {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'coupons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )

    await queryInterface.addColumn(
      'checkout_sessions',
      'couponId',
      {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: 'coupons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('orders', 'couponId')
    await queryInterface.removeColumn('checkout_sessions', 'couponId')
  }
}
