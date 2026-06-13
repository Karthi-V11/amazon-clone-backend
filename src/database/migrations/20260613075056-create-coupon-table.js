'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('coupons', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      type: {
        type: Sequelize.ENUM('percentage', 'flat'),
        allowNull: false
      },
      value: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      minOrderAmount: {
        type: Sequelize.DECIMAL(10, 2),
        defaultValue: 0
      },
      maxDiscount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      expiryDate: {
        type: Sequelize.DATE,
        allowNull: true
      },
      usageLimit: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      usedCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      moreDetails: {
        type: Sequelize.JSON,
        allowNull: true
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
    await queryInterface.dropTable('coupons')
  }
}