# Bitcoin Satoshi Converter

Easy conversion between BTC, EUR and Satoshi

[![Docker-Publish](https://github.com/DocBrown101/Bitcoin-Satoshi-Converter/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/DocBrown101/Bitcoin-Satoshi-Converter/actions/workflows/docker-publish.yml)
[![docker_pulls](https://img.shields.io/docker/pulls/docbrown101/bitcoin-satoshi-converter)](https://hub.docker.com/r/docbrown101/bitcoin-satoshi-converter)

Multi-arch builds for **linux/amd64** and **linux/arm/v7**

## Docker Image can be found here:
- https://hub.docker.com/r/docbrown101/bitcoin-satoshi-converter

### Docker Compose:
```yaml
version: '2.4'

services:
  app:
    image: docbrown101/bitcoin-satoshi-converter:latest
    container_name: BTC-converter
    read_only: true
    tmpfs:
      - /var/run
      - /var/cache/nginx
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Fiat Price APIs
- https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur
- https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR
