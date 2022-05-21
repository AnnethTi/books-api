'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password : DataTypes.STRING,
      type: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      lastname: DataTypes.STRING,
    })
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('users');
  }
};
