# build
FROM node:lts-buster AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

# production
FROM nginx:1.23.3-alpine
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
USER nonroot
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
