'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'googleId', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('users', 'provider', {
      type: Sequelize.ENUM('LOCAL', 'GOOGLE'),
      allowNull: false,
      defaultValue: 'LOCAL',
    });

    await queryInterface.changeColumn('users', 'phone', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'googleId');
    await queryInterface.removeColumn('users', 'provider');
    await queryInterface.changeColumn('users', 'phone', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_provider";'
    );
  }
};
