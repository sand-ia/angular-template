FROM node:16-alpine3.16 as build
WORKDIR /app
COPY ./package*.json ./
RUN npm ci

COPY ./ ./
RUN npm run build --prod

FROM nginx:1.23.0-alpine
EXPOSE 9000
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/angular-template /usr/share/nginx/html
