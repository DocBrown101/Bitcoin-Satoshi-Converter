# Bitcoin Satoshi Converter

Easy conversion between BTC, EUR and Satoshi

[![Docker-Publish](https://github.com/DocBrown101/Bitcoin-Satoshi-Converter/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/DocBrown101/Bitcoin-Satoshi-Converter/actions/workflows/docker-publish.yml)
[![Docker_pulls](https://img.shields.io/docker/pulls/docbrown101/bitcoin-satoshi-converter)](https://hub.docker.com/r/docbrown101/bitcoin-satoshi-converter)
[![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/docbrown101/bitcoin-satoshi-converter)](https://hub.docker.com/r/docbrown101/bitcoin-satoshi-converter)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=DocBrown101_Bitcoin-Satoshi-Converter&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=DocBrown101_Bitcoin-Satoshi-Converter)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=DocBrown101_Bitcoin-Satoshi-Converter&metric=ncloc)](https://sonarcloud.io/dashboard?id=DocBrown101_Bitcoin-Satoshi-Converter)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=DocBrown101_Bitcoin-Satoshi-Converter&metric=security_rating)](https://sonarcloud.io/dashboard?id=DocBrown101_Bitcoin-Satoshi-Converter)

Multi-arch builds for **linux/amd64** and **linux/arm/v7**

![Preview](https://github.com/DocBrown101/Bitcoin-Satoshi-Converter/blob/main/light_dark.png)

## Docker Image can be found here:

- https://hub.docker.com/r/docbrown101/bitcoin-satoshi-converter

### Docker Compose:

```yaml
version: '2.4'

services:
  app:
    image: docbrown101/bitcoin-satoshi-converter:latest
    container_name: BTC-converter
    ports:
      - 8080:80
    user: 1000:1000
    read_only: true
    tmpfs:
      - /var/run:mode=770,size=512K,uid=1000,gid=1000
      - /var/cache/nginx:mode=770,size=512K,uid=1000,gid=1000
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

### Usable Fiat Price APIs

- https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=EUR,USD
- https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur,usd
- https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=EUR,USD
- https://api.kraken.com/0/public/Ticker?pair=BTCEUR,BTCUSD

#### Default mempool websocket connection

- wss://mempool.space/api/v1/ws