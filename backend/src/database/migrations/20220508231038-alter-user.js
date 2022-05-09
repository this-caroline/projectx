'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return [ queryInterface.addColumn(
      'Users',
      'admin',
      Sequelize.BOOLEAN
     )];
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
