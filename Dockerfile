FROM node:latest as node
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build:prod

FROM nginx:alpine
COPY nginx.config /etc/nginx/nginx.config
COPY --from=node /app/dist/SampleLogin /usr/share/nginx/html

EXPOSE 80
