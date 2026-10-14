# build
FROM --platform=$BUILDPLATFORM node:24-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html vite.config.ts tsconfig.json vite-env.d.ts ./
COPY public ./public
COPY src ./src
COPY tests ./tests
RUN npm run build

# production
FROM nginxinc/nginx-unprivileged:1.30.5-alpine
USER root
RUN sed -i 's/worker_processes .*/worker_processes 1;/' /etc/nginx/nginx.conf
USER 1000:1000
COPY --from=build /app/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
