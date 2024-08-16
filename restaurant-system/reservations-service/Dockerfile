FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Copia el script wait-for-it.sh al contenedor
# Copiar el script wait-for-it.sh al contenedor
COPY wait-for-it.sh /usr/local/bin/

# Darle permisos de ejecución al script
RUN chmod +x /usr/local/bin/wait-for-it.sh

# Exponer el puerto del microservicio
EXPOSE 3000

# Ejecuta wait-for-it.sh usando bash para mayor compatibilidad
CMD ["bash", "wait-for-it.sh", "db:5432", "--", "node", "server.js"]
