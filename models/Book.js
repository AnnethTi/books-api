const {DataTypes} = require('sequelize')


module.exports = (sequelize)=> sequelize.define('books',{
    id: {type:DataTypes.INTEGER, primaryKey: true, autoincrement: true},
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
})