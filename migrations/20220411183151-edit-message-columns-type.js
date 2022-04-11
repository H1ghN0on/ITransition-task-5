"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.changeColumn("Messages", "destination", {
      type: Sequelize.INTEGER,
    });
    queryInterface.changeColumn("Messages", "sender", {
      type: Sequelize.INTEGER,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
