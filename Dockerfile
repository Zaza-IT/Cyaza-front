FROM node:20-alpine

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm install

# Copia o código
COPY . .

# Expõe a porta que definimos no package.json
EXPOSE 4200

# Roda o comando ajustado
CMD ["npm", "run", "dev"]