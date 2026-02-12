# Dockerfile
FROM node:20-alpine

WORKDIR /app

# 1. Instala dependências de sistema necessárias para o Next.js/SWC no Alpine
RUN apk add --no-cache libc6-compat

# 2. Copia apenas os package.json primeiro (para cache do Docker)
COPY package*.json ./

# 3. Instala as dependências limpas
RUN npm install

# 4. Copia o resto do código (respeitando o .dockerignore)
COPY . .

# 5. CONFIGURAÇÃO DE REDE (O Segredo)
# Força o Next a rodar em 0.0.0.0 e na porta 4200 via variável de ambiente
ENV HOSTNAME="0.0.0.0"
ENV PORT=4200

# 6. Expõe a porta
EXPOSE 4200

# 7. Comando simples
CMD ["npm", "run", "dev"]