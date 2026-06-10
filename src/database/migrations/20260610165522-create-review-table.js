'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },

      productId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      userId: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },

      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      title: {
        type: Sequelize.STRING,
        allowNull: true
      },

      comment: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      images: {
        type: Sequelize.JSONB,
        allowNull: false,
        defaultValue: []
      },

      helpfulCount: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },

      verifiedPurchase: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },

      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })

    await queryInterface.addIndex('reviews', ['productId'])
    await queryInterface.addIndex('reviews', ['userId'])
    await queryInterface.addIndex('reviews', ['rating'])

    await queryInterface.addConstraint('reviews', {
      fields: ['productId', 'userId'],
      type: 'unique',
      name: 'reviews_product_user_unique'
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('reviews')
  }
}