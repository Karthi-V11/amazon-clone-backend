'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('order_items', 'productName', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    })

    await queryInterface.addColumn('order_items', 'productImage', {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: ''
    })

    await queryInterface.addColumn('order_items', 'productBrand', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: ''
    })
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('order_items', 'productName')
    await queryInterface.removeColumn('order_items', 'productImage')
    await queryInterface.removeColumn('order_items', 'productBrand')
  }
}