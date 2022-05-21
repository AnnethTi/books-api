// db.js
const { Sequelize } = require('sequelize');

// Importacion de modelos
const User = require('./models/User');
const Book = require('./models/Book');

// Conexion a la base de datos
const sequelize = new Sequelize('books_api', 'root', 'qazwsx1234', {
  host: 'localhost',
  port:'3322',
  dialect: 'mariadb',
  logging: false,
});

// Obtener modelos
const models = [
  User,
  Book,
];

// Registrar modelos al sequelize
for (let model of models) {
  model(sequelize);
}


module.exports = sequelize;