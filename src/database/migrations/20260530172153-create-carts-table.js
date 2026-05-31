'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'active',
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

    await queryInterface.addIndex('carts', ['user_id'], {
      name: 'carts_user_id_idx',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('carts');
  },
};