FROM node:lts-alpine as build-stage

COPY . /app
WORKDIR /app
RUN npm install
RUN npm run build

# Build NGINX
FROM nginx

COPY --from=build-stage /app/dist /usr/share/nginx/html/