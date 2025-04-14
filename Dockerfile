# Use a imagem base Node.js Alpine
FROM node:20.18.0-alpine

# Configuração padrão de ENV
ENV NODE_ENV="dev"

# Diretório de trabalho na imagem
WORKDIR /usr/src/app

# Copie o restante dos arquivos da aplicação
COPY . .

# Instale as dependências
RUN npm install -g @nestjs/cli && \
    npm i --force && \
    ## Executando NEST BUILD Ignorando erros
    nest build || true

# # Porta exposta pela aplicação
EXPOSE 3000

# # Comando de inicialização
CMD ["node", "dist/src/main"]