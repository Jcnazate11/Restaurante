const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./db');
const routes = require('./views/routes');

const app = express();

app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`[Users Service] ${req.method} ${req.url}`);
  next();
});

app.use('/', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal en el servicio de usuarios!');
});

const PORT = process.env.PORT || 3001;

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos de usuarios establecida');
    app.listen(PORT, () => {
      console.log(`Servidor de usuarios corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => console.log('Error en la conexión a la base de datos de usuarios:', err));