# Dev

1. Clonar el .env.template y crear el .env

2. Ejecutar comando "docker compose up -d"

3. Instalar prisma con el comando "npm install prisma --save-dev"

4. Realizar ajustes para que prisma se conecte con postgresql con el siguiente comando "npx prisma init --datasource-provider postgresql"

5. Una vez realizado el modelo en prisma, ejecutar la migración con el comando " npx prisma migrate dev --name init "
