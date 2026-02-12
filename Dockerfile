# Usando Node 18 ou superior para compatibilidade com Next 15
FROM node:20-alpine

WORKDIR /app

# Copia os arquivos de configuração de pacotes
COPY package*.json ./

# Instala as dependências (usando --frozen-lockfile se tiver um lock file, ou apenas install)
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta solicitada
EXPOSE 4200

# Comando para rodar em modo desenvolvimento na porta 4200
# O hostname 0.0.0.0 é obrigatório para o Docker funcionar
CMD ["npm", "run", "dev", "--", "-p", "4200", "-H", "0.0.0.0"]