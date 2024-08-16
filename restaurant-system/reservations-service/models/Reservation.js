const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Reservation = sequelize.define('Reservation', {
  nombre_cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  num_personas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false
  },
  mesa: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Reservation;
