# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

# Roda em modo DEV na porta 4200
CMD ["npm", "run", "dev", "--", "-p", "4200", "-H", "0.0.0.0"]