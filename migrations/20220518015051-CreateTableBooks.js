'use strict';

const { DataTypes } = require("sequelize");

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.createTable('books', { 
      id: {type:DataTypes.INTEGER, primaryKey: true, autoincrement: true},
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      image: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.STRING,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      });
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.dropTable('books');
  }
};
