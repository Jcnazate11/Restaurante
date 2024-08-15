const express = require('express');
const app = express();
const { Pool } = require('pg');
require('dotenv').config();

app.use(express.json()); // Middleware actualizado

// Configuración de la conexión a PostgreSQL
const pool = new Pool({
  user: process.env.RESTAURANT_ADMIN,
  host: process.env.LOCALHOST,
  database: process.env.RESTAURANTE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT
});

// Endpoint para crear una nueva reserva
app.post('/reservas', async (req, res) => {
  const { nombreCliente, numPersonas, fecha, hora, mesa } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO reservas (nombre_cliente, num_personas, fecha, hora, mesa) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombreCliente, numPersonas, fecha, hora, mesa]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(`Error al crear la reserva: ${error.message}`);
  }
});

// Endpoint para obtener todas las reservas
app.get('/reservas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reservas');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).send(`Error al obtener reservas: ${error.message}`);
  }
});

// Endpoint para obtener una reserva por ID
app.get('/reservas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM reservas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Reserva no encontrada');
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(`Error al obtener la reserva: ${error.message}`);
  }
});

// Endpoint para actualizar una reserva por ID
app.put('/reservas/:id', async (req, res) => {
  const { id } = req.params;
  const { nombreCliente, numPersonas, fecha, hora, mesa } = req.body;
  try {
    const result = await pool.query(
      'UPDATE reservas SET nombre_cliente = $1, num_personas = $2, fecha = $3, hora = $4, mesa = $5 WHERE id = $6 RETURNING *',
      [nombreCliente, numPersonas, fecha, hora, mesa, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Reserva no encontrada');
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(`Error al actualizar la reserva: ${error.message}`);
  }
});

// Endpoint para eliminar una reserva por ID
app.delete('/reservas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM reservas WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Reserva no encontrada');
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).send(`Error al eliminar la reserva: ${error.message}`);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor de reservas corriendo en el puerto ${PORT}`);
});
