## Restaurant Reservation System
Descripción del proyecto:

Este proyecto es una aplicación de reservas para un restaurante, diseñada utilizando microservicios. El sistema permite registrar usuarios, realizar reservas y gestionar los datos de ambos. Está desarrollado con Node.js y Express para los servicios backend y PostgreSQL como base de datos.

El sistema cuenta con un API Gateway que coordina las peticiones a los diferentes microservicios, como el servicio de gestión de usuarios y el servicio de reservas.
Instrucciones para ejecutar el proyecto
1. Clonar el repositorio
```
git clone <url-del-repositorio>
```
## 2. Instalar dependencias

Cada microservicio tiene su propio conjunto de dependencias. Ve al directorio de cada servicio y ejecuta:

```
cd users-service
npm install
```
```
cd reservations-service
npm install
```
```
cd api-gateway
npm install
```

## 3. Configurar variables de entorno

Crear un archivo .env en cada uno de los servicios (users-service, reservations-service, api-gateway) con las siguientes variables:

Para users-service:

```
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=db
DB_PORT=5432
DB_NAME=restaurant_users
JWT_SECRET=tu_secreto_jwt
```
Para reservations-service:

```
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=db
DB_PORT=5432
DB_NAME=restaurant_reservations
```

Para api-gateway:
```

JWT_SECRET=tu_secreto_jwt
```
## 4. Ejecutar el proyecto con Docker

```

docker-compose up --build
```
## 5. Probar la aplicación

Puedes probar el API utilizando herramientas como Postman o curl.

Registrar un usuario:


POST http://localhost:8080/api/users/register
```
Body: {
    "nombre": "John Doe",
    "email": "john.doe@example.com",
    "password": "123456",
    "role": "admin"
}
```

Crear una reserva:


POST http://localhost:8080/api/reservation

            Body: {
                "nombre_cliente": "Jane Doe",
                "num_personas": 4,
                "fecha": "2024-08-15",
                "hora": "20:00",
                "mesa": 3
            }

## Dependencias necesarias

    Node.js (versión 14 o superior)
    Express
    PostgreSQL
    Sequelize (ORM para la base de datos)
    bcryptjs (para encriptación de contraseñas)
    jsonwebtoken (para autenticación JWT)
    Docker y Docker Compose
