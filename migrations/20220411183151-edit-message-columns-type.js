"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.changeColumn("Messages", "destination", {
      type: 'INTEGER USING CAST("destination" as INTEGER)',
    });
    queryInterface.changeColumn("Messages", "sender", {
      type: 'INTEGER USING CAST("sender" as INTEGER)',
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
