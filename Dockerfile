# этап сборки (build stage)
FROM node:16-alpine as build-stage

# Установка прокси для docker build
ARG HTTP_PROXY=http://192.168.1.10:8080
ENV http_proxy=$HTTP_PROXY

# Используем реестр npm Taobao
RUN npm config set registry https://registry.npm.taobao.org

WORKDIR /app

# COPY package*.json ./
# RUN npm install
COPY . .
RUN npm run build

# EXPOSE 3000
# CMD ["npm", "run", "start"]

# этап production (production-stage)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
