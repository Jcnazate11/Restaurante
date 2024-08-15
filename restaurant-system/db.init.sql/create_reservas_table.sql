-- Conectarse a la base de datos "restaurante" para crear la tabla "reservas"
\c restaurante

CREATE TABLE IF NOT EXISTS reservas (
  id SERIAL PRIMARY KEY,
  nombre_cliente VARCHAR(100) NOT NULL,
  num_personas INT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  mesa VARCHAR(10) NOT NULL
);