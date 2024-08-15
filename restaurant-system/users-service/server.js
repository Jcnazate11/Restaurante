const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

// Registro de usuarios
app.post('/register', async (req, res) => {
  const { nombre, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      'INSERT INTO users (nombre, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, email, hashedPassword, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error); // Para ver el error en la consola del servidor
    res.status(500).send(`Error en el registro: ${error.message}`);
      }
});

// Inicio de sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
      res.status(200).json({ token });
    } else {
      res.status(401).send('Credenciales inválidas');
    }
  } catch (error) {
    console.error(error); // Para ver el error en la consola del servidor
    res.status(500).send(`Error en el inicio de sesión: ${error.message}`);
      }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor de usuarios corriendo en el puerto ${PORT}`);
});
