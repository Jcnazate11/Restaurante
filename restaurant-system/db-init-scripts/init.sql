-- Crear la base de datos "restaurant_users" si no existe
CREATE DATABASE IF NOT EXISTS restaurant_users;

-- Conectarse a la base de datos "restaurant_users"
\connect restaurant_users;

-- Crear la tabla "users" en la base de datos "restaurant_users"
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL
);

-- Crear la base de datos "restaurante" si no existe
CREATE DATABASE IF NOT EXISTS restaurante;

-- Conectarse a la base de datos "restaurante"
\connect restaurante;

-- Crear la tabla "reservas" en la base de datos "restaurante"
CREATE TABLE IF NOT EXISTS reservas (
  id SERIAL PRIMARY KEY,
  nombre_cliente VARCHAR(100) NOT NULL,
  num_personas INT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  mesa VARCHAR(10) NOT NULL
);
