# Usa una imagen base de Node.js
FROM node:14

# Configura el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto donde correrá el microservicio
EXPOSE 3000

# Comando para iniciar el microservicio
CMD ["node", "server.js"]
