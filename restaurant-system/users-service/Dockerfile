FROM node:14
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Copiar el script wait-for-it.sh y ejecutarlo con bash
# Copiar el script wait-for-it.sh al contenedor
COPY wait-for-it.sh /usr/local/bin/

# Darle permisos de ejecución al script
RUN chmod +x /usr/local/bin/wait-for-it.sh
EXPOSE 3001
CMD ["bash", "wait-for-it.sh", "db:5432", "--", "node", "server.js"]
