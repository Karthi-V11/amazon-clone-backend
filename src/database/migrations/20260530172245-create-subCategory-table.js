'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sub_categories', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      parentId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: { model: 'categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    })

    await queryInterface.addIndex('sub_categories', ['slug'], {
      unique: true,
      name: 'sub_categories_slug_unique_idx',
    })

    await queryInterface.addIndex('sub_categories', ['parentId'], {
      name: 'sub_categories_parent_id_idx',
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sub_categories');
  },
}