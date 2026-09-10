# Estágio 1: Build da aplicação Vite
FROM node:20-alpine AS builder
WORKDIR /app
# Copia os arquivos de dependência e instala
COPY package*.json ./
RUN npm install
# Copia o restante do código e gera a pasta dist/
COPY . .
RUN npm run build

# Estágio 2: Servidor Web de Produção
FROM nginx:alpine
# Remove a página padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*
# Copia a pasta dist gerada no Estágio 1 para o Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Expõe a porta 80
EXPOSE 80
# Inicia o servidor
CMD ["nginx", "-g", "daemon off;"]