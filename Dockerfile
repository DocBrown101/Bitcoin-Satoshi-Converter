# build
FROM node:lts-buster as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# production
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
