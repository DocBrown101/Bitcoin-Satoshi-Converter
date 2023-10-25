# build
FROM node:lts-buster AS build
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent --ignore-scripts
COPY ./public ./public
COPY ./src ./src
RUN npm run build

# production
FROM nginx:1.25.2-alpine
RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
USER nonroot
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
